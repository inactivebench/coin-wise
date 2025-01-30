import { useState, useEffect } from "react";

const Breakdown = ({ pieData, filteredData }) => {
  const [firstDate, setFirstDate] = useState({});
  const [lastDate, setLastDate] = useState({});
  const [averageSpend, setAverageSpend] = useState();
  const [frequentCategory, setFrequentCategory] = useState({});

  const average = () => {
    const sum = pieData.reduce((acc, curr) => {
      return acc + curr.amount_spent;
    }, 0);
    const sortedData = [...filteredData].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    const lastEl = sortedData.length - 1;
    const firstMonth = new Date(sortedData[0].date).getMonth();
    const lastMonth = new Date(sortedData[lastEl].date).getMonth();
    const months = lastMonth - firstMonth;
    const avg = sum / months;
    setAverageSpend(avg);
    console.log({ sortedData });

    console.log({ sum, months });
  };
  const findDate = () => {
    const sortedData = [...filteredData].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    const lastEl = sortedData.length - 1;
    const firstMonth = new Date(sortedData[0].date).toLocaleString("default", {
      month: "short",
    });
    const lastMonth = new Date(sortedData[lastEl].date).toLocaleString(
      "default",
      {
        month: "short",
      }
    );
    const firstYear = new Date(sortedData[0].date).getFullYear();
    const lastYear = new Date(sortedData[lastEl].date).getFullYear();

    const first = { month: firstMonth, year: firstYear };
    const last = { month: lastMonth, year: lastYear };

    setFirstDate(first);
    setLastDate(last);
  };

  const mostFrequent = () => {
    const categoryCount = filteredData.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});
    let maxCount = 0;
    let mostFrequentCategory = null;

    for (const category in categoryCount) {
      if (categoryCount[category] > maxCount) {
        maxCount = categoryCount[category];
        mostFrequentCategory = category;
      }
    }
    const category = filteredData.find(
      (obj) => obj.category === mostFrequentCategory
    );
    setFrequentCategory(category);
  };
  const largestSpend = pieData.reduce(
    (acc, curr) => {
      let max = acc.amount_spent > curr.amount_spent ? acc : curr;
      return max;
    },
    [pieData[0]]
  );
  useEffect(() => {
    if (filteredData.length > 0) {
      findDate();
      mostFrequent();
    }
    if (filteredData.length > 0 && pieData.length > 0) average();
  }, [pieData, filteredData]);
  return (
    <div className='breakdown'>
      <div className='breakdown-section'>
        <h2 className='fs-500'>
          {firstDate.month} {firstDate.year} - {lastDate.month} {lastDate.year}
        </h2>
      </div>
      <div className='breakdown-section'>
        <h2 className='fs-400 capitalize'>average monthly spending</h2>
        <p className='fs-500 bold'>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          }).format(averageSpend)}
        </p>
      </div>
      <div className='breakdown-section'>
        <h2 className='fs-400 capitalize'>most frequent category</h2>
        <p className='fs-500 bold'>{frequentCategory.category}</p>
      </div>
      <div className='breakdown-section'>
        <h2 className='fs-400 capitalize'>largest outflow</h2>
        <p className='fs-500 bold'>{largestSpend.category}</p>
        <p>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(largestSpend.amount_spent)}
        </p>
      </div>
    </div>
  );
};
export default Breakdown;
