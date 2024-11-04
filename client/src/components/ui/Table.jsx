import "../../css/table.css";

const Table = ({ tableData }) => {
  return (
    <div className=' table-container '>
      <table className='table '>
        <thead className='ff-montserrat'>
          <tr>
            <th className='table-header capitalize'>
              <p>transaction</p>
            </th>
            <th className='table-header capitalize'>
              <p>amount</p>
            </th>
            <th className='table-header capitalize'>
              <p>transaction cost</p>
            </th>
            <th className='table-header capitalize'>
              <p>date</p>
            </th>
            <th className='table-header capitalize'>
              <p>category</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.length === 0 ? (
            <tr>
              <td>No Transactions found</td>
            </tr>
          ) : (
            tableData.map((item, index) => (
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
                  <p>
                    {new Date(item.datetime).toLocaleString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </p>
                </td>
                <td className='table-data'>
                  <p>{item.category}</p>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
