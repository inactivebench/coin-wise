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
      <PieChart width={400} height={400}>
        <Pie
          data={pieData}
          dataKey='total_amount'
          nameKey='category'
          cx='50%'
          cy='50%'
          outerRadius={250}
          fill='#8884d8'
          label
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
