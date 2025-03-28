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
import { COLORS } from "@/data";
import Breakdown from "./Breakdown";
import { useGlobalContext } from "@/context";

const CategoryPieChart = () => {
  const CATEGORY_URL = "/transaction/newCategory";
  const [pieData, setPieData] = useState([]);
  const [filteredPieData, setFilteredPieData] = useState([]);
  const [duration, setDuration] = useState("");
  const [expenseTotals, setExpenseTotals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const { convertAmount } = useGlobalContext();

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
            setFilteredPieData(data);
          }
        });
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

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

  const calculateTotals = () => {
    const categoryTotals = [];
    filteredPieData.forEach((transaction) => {
      const { category, type, amount_spent, date } = transaction;
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
            date: date,
          });
        }
      }
    });
    setExpenseTotals(categoryTotals);
  };

  const SectorLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    name,
    value,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 60;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const yOffset = midAngle > 180 ? 15 : -15;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) + yOffset;

    return (
      <text
        x={x}
        y={y}
        textAnchor={x > cx ? "start" : x < cx ? "end" : "middle"}
        fontSize='1.5rem'
        fill='#000'
      >
        <tspan fontWeight='bold'>{name}</tspan>
        <tspan x={x} dy='25' fontSize='1rem'>
          {convertAmount(value)} ({(percent * 100).toFixed(0)}%)
        </tspan>
      </text>
    );
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (pieData.length > 0) filterDate();
  }, [pieData, duration]);

  useEffect(() => {
    if (filteredPieData.length > 0) calculateTotals();
  }, [filteredPieData]);
  return (
    <>
      {isLoading ? (
        <p>Loading chart data...</p>
      ) : (
        <div className='flex pie-chart'>
          <ResponsiveContainer width='100%' height={600}>
            <div className='flex chart-title-container'>
              <h1 className='capitalize fs-500'>
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
                <option value='this month'>This Month</option>
                <option value='last 3 months'>Last 3 Months</option>
                <option value='last 6 months'>Last 6 Months</option>
                <option value='last 12 months'>Last 12 Months</option>
                <option value='last year'>Last Year</option>
                <option value='all dates'>All Dates</option>
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
                label={SectorLabel}
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
                            {convertAmount(
                              expenseTotals.reduce((acc, curr) => {
                                let total = acc + curr.amount_spent;
                                return total;
                              }, 0)
                            )}
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
              <Tooltip
                formatter={(value) =>
                  `${new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(value)}`
                }
              />
            </PieChart>
          </ResponsiveContainer>
          <Breakdown pieData={expenseTotals} filteredData={filteredPieData} />
        </div>
      )}
    </>
  );
};
export default CategoryPieChart;
