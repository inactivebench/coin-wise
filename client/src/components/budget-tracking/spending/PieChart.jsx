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
  const [expenseTotals, setExpenseTotals] = useState([]);
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
            setPieData(response.data);
          }
        });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const calculateTotals = () => {
      const categoryTotals = [];
      pieData.forEach((transaction) => {
        const { category, type, amount_spent } = transaction;
        if (type === "expense") {
          const existingCategory = categoryTotals.find(
            (item) => item.category === category
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
      console.log(categoryTotals);
    };

    calculateTotals();
  }, [pieData]);
  return (
    <div className='flex pie-chart'>
      <ResponsiveContainer width='100%' height={600}>
        <h1 className='capitalize fs-600'>
          representation of spending category totals
        </h1>
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
            {pieData.map((entry, index) => (
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
                      <tspan x={viewBox.cx} y={viewBox.cy} className='fs-700'>
                        {pieData.reduce((acc, curr) => {
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
  );
};
export default CategoryPieChart;
