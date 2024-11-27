import { axiosPrivate } from "@/api/axios";
import useAuth from "@/hook/useAuth";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Label,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CategoryPieChart = () => {
  const CATEGORY_URL = "/transaction/category";
  const [pieData, setPieData] = useState([]);
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

  return (
    <div className='flex'>
      <PieChart width={500} height={500}>
        <Pie
          data={pieData}
          dataKey='total_amount'
          nameKey='category'
          cx='50%'
          cy='50%'
          innerRadius={100}
          outerRadius={160}
          fill='#000000'
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}

          <Label
            className='uppercase'
            value='total spending'
            position='centerBottom'
          />
          <Label
            value={pieData.reduce((acc, curr) => {
              let total = acc + curr.total_amount;
              return total;
            }, 0)}
            position='centerTop'
          />
        </Pie>
        <Tooltip nameKey='category' />
        <Legend nameKey='category' />
      </PieChart>
      <div>
        spending breakdown
        <div>Total Spending</div>
        <table className='table-spend'>
          <thead>
            <tr>
              <th className='table-header'>
                <p className='uppercase'>category</p>
              </th>
              <th className='table-header'>
                <p className='uppercase'>spending</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {pieData.map((item, index) => {
              const { category, total_amount } = item;
              return (
                <tr key={index}>
                  <td>
                    <p>{category}</p>
                  </td>
                  <td>
                    <p>{total_amount}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CategoryPieChart;
