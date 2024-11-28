const Breakdown = ({ pieData }) => {
  const sum = pieData.reduce((acc, curr) => {
    return acc + curr.total_amount;
  }, 0);

  return (
    <div className='breakdown'>
      <div className='breakdown-section'>
        <h2>Jun 2021 - Dec 2020</h2>
        <p className='uppercase'>all categories included</p>
      </div>
      <div className='breakdown-section'>
        <h2 className='uppercase'>total spending</h2>
        <p className=' fs-500'>{`$ ${sum}`}</p>
      </div>
      <table className='table-spend'>
        <thead>
          <tr>
            <th>
              <p className='uppercase'>category</p>
            </th>
            <th>
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
  );
};
export default Breakdown;
