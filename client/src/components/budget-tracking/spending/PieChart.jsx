import { axiosPrivate } from "@/api/axios";
import useAuth from "@/hook/useAuth";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Label,
  ResponsiveContainer,
} from "recharts";
import Breakdown from "./Breakdown";

const CategoryPieChart = () => {
  const CATEGORY_URL = "/transaction/newCategory";
  const [pieData, setPieData] = useState([]);
  const [filteredPieData, setFilteredPieData] = useState([]);
  const [duration, setDuration] = useState("");
  const [expenseTotals, setExpenseTotals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const COLORS = [
    "#003F5C",
    "#58508d",
    "#9B3192",
    "#bc5090",
    "#ff6361",
    "#ffa600",
    "#F7B7A3",
    "#939b90",
    "#cde492",
  ];

  const fetchCategories = async () => {
    try {
      const response = await axiosPrivate
        .get(CATEGORY_URL, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        })
        .then((response) => {
          if (!response?.data) {
            throw err;
          } else {
            const data = response?.data;
            setPieData(data);
          }
        });
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    filterDate();
  }, [pieData, duration]);

  const filterDate = () => {
    if (duration === "all dates") {
      setFilteredPieData(pieData);
      return;
    }
    const filteredData = pieData.filter((transaction) => {
      const newDate = new Date(transaction.date).getMonth() + 1;
      const thisMonth = new Date().getMonth() + 1;

      if (duration === "this month") {
        return newDate === thisMonth;
      } else if (duration === "last 3 months") {
        const threeMonthsAgo = thisMonth - 3;
        let adjustedMonths =
          threeMonthsAgo <= 0 ? 12 + threeMonthsAgo : threeMonthsAgo;
        return newDate >= adjustedMonths || newDate <= thisMonth;
      } else if (duration === "last 6 months") {
        const sixMonthsAgo = thisMonth - 6;
        let adjustedMonths =
          sixMonthsAgo <= 0 ? 12 + sixMonthsAgo : sixMonthsAgo;
        return newDate >= adjustedMonths || newDate <= thisMonth;
      } else if (duration === "last 12 months") {
        const twelveMonthsAgo = thisMonth - 12;
        let adjustedMonths =
          twelveMonthsAgo <= 0 ? 12 + twelveMonthsAgo : twelveMonthsAgo;
        return newDate >= adjustedMonths || newDate <= thisMonth;
      } else if (duration === "last year") {
        const lastYear = new Date().getFullYear() - 1;
        const year = new Date(transaction.date).getFullYear();
        return year === lastYear;
      }
    });
    setFilteredPieData(filteredData);
  };

  useEffect(() => {
    const calculateTotals = () => {
      const categoryTotals = [];
      filteredPieData.forEach((transaction) => {
        const { category, type, amount_spent } = transaction;
        if (type === "expense") {
          const existingCategory = categoryTotals.find(
            (transaction) => transaction.category === category
          );
          if (existingCategory) {
            existingCategory.amount_spent += amount_spent;
          } else {
            categoryTotals.push({
              category: category,
              amount_spent: amount_spent,
            });
          }
        }
      });
      setExpenseTotals(categoryTotals);
    };
    calculateTotals();
  }, [filteredPieData]);
  return (
    <>
      {isLoading ? (
        <p>Loading chart data...</p>
      ) : (
        <div className='flex pie-chart'>
          <ResponsiveContainer width='100%' height={600}>
            <div className='flex'>
              <h1 className='capitalize fs-600'>
                representation of spending category totals
              </h1>

              <select
                name='dates'
                id='dates-select'
                defaultValue={"all dates"}
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
              >
                <option value='this month'>this month</option>
                <option value='last 3 months'>last 3 months</option>
                <option value='last 6 months'>last 6 months</option>
                <option value='last 12 months'>last 12 months</option>
                <option value='last year'>last year</option>
                <option value='all dates'>all dates</option>
              </select>
            </div>
            <PieChart>
              <Pie
                data={expenseTotals}
                dataKey='amount_spent'
                nameKey='category'
                cx='50%'
                cy='50%'
                innerRadius={150}
                outerRadius={200}
                fill='#000000'
              >
                {expenseTotals.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor='middle'
                          dominantBaseline='middle'
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className='fs-700'
                          >
                            {expenseTotals.reduce((acc, curr) => {
                              let total = acc + curr.amount_spent;
                              return total;
                            }, 0)}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy + 10 || 0) + 24}
                            className='uppercase fs-300'
                          >
                            total spending
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <Tooltip nameKey='category' />
            </PieChart>
          </ResponsiveContainer>

          <Breakdown pieData={expenseTotals} colors={COLORS} />
        </div>
      )}
    </>
  );
};
export default CategoryPieChart;
