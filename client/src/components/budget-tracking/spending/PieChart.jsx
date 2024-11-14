import { axiosPrivate } from "@/api/axios";
import useAuth from "@/hook/useAuth";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CategoryPieChart = () => {
  const CATEGORY_URL = "/transaction/category";
  const [pieData, setPieData] = useState([]);
  const { auth } = useAuth();

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
  return (
    <div>
      <h2>pie chart</h2>
      <PieChart width={500} height={500}>
        <Pie
          data={pieData}
          dataKey='total_amount'
          nameKey='category'
          cx='50%'
          cy='50%'
          innerRadius={60}
          outerRadius={160}
          fill='#000000'
        >
          {pieData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            />
          ))}
        </Pie>
        <Tooltip nameKey='category' />
        <Legend nameKey='category' />
      </PieChart>
    </div>
  );
};
export default CategoryPieChart;
