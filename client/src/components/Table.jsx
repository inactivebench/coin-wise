import { useEffect, useState } from "react";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import useAuth from "../hook/useAuth";

const Table = () => {
  const URL = "/users/transaction";
  const [tableData, setTableData] = useState([]);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const fetchData = async () => {
    try {
      const response = await axiosPrivate
        .get(URL, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);

          if (!response?.data) {
            throw err;
          } else {
            setTableData(response.data);
          }
        });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=' table-container '>
      <table className='table'>
        <thead>
          <tr>
            <th className='table-header'>
              <p>transaction</p>
            </th>
            <th className='table-header'>
              <p>amount</p>
            </th>
            <th className='table-header'>
              <p>transaction cost</p>
            </th>
            <th className='table-header'>
              <p>date</p>
            </th>
            <th className='table-header'>
              <p>category</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index} className=''>
              <td className='table-data'>
                <p>{item.transaction_description}</p>
              </td>
              <td className='table-data'>
                <p>{item.amount_spent}</p>
              </td>
              <td className='table-data'>
                <p>{item.transaction_cost}</p>
              </td>
              <td className='table-data'>
                <p>{item.datetime}</p>
              </td>
              <td className='table-data'>
                <p>{item.category}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
