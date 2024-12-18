const Breakdown = ({ pieData, colors }) => {
  const sum = pieData.reduce((acc, curr) => {
    return acc + curr.amount_spent;
  }, 0);

  return (
    <div className='breakdown'>
      <div className='breakdown-section'>
        <h2>Jun 2021 - Dec 2020</h2>
        <p className='uppercase'>all categories included</p>
      </div>
      <div className='breakdown-section'>
        <h2 className='uppercase'>total spending</h2>
        <p className=' fs-500 bold'>{`$ ${sum}`}</p>
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
            const { category, amount_spent } = item;
            return (
              <tr key={index}>
                <td className='flex'>
                  <div
                    style={{
                      backgroundColor: `${colors[index]}`,
                      width: "20px",
                      height: "20px",
                      margin: "auto 0 ",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <p>{category}</p>
                </td>
                <td>
                  <p>{`$ ${amount_spent}`}</p>
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
