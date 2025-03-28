import { useGlobalContext } from "@/context";
import { useState, useEffect } from "react";

const Breakdown = ({ pieData, filteredData }) => {
  const [firstDate, setFirstDate] = useState({});
  const [lastDate, setLastDate] = useState({});
  const [averageSpend, setAverageSpend] = useState();
  const [frequentCategory, setFrequentCategory] = useState({});

  const { convertAmount } = useGlobalContext();

  const expenseData = filteredData.filter(
    (transaction) => transaction.type === "expense"
  );
  const average = () => {
    const sum = expenseData.reduce((acc, curr) => {
      return acc + curr.amount_spent;
    }, 0);
    const sortedData = [...expenseData].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    const lastEl = sortedData.length - 1;
    const firstMonth = new Date(sortedData[0].date).getMonth();
    const lastMonth = new Date(sortedData[lastEl].date).getMonth();
    const months = lastMonth - firstMonth;
    const avg = sum / months;
    setAverageSpend(avg);
  };
  const findDate = () => {
    const sortedData = [...expenseData].sort(
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
    const categoryCount = expenseData.reduce((acc, curr) => {
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
    const category = expenseData.find(
      (transaction) => transaction.category === mostFrequentCategory
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
      average();
      mostFrequent();
    }
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
        <p className='fs-500 bold'>{convertAmount(averageSpend)}</p>
      </div>
      <div className='breakdown-section'>
        <h2 className='fs-400 capitalize'>most frequent category</h2>
        <p className='fs-500 bold'>{frequentCategory.category}</p>
      </div>
      <div className='breakdown-section'>
        <h2 className='fs-400 capitalize'>largest outflow</h2>
        <p className='fs-500 bold'>{largestSpend.category}</p>
        <p>{convertAmount(largestSpend.amount_spent)}</p>
      </div>
    </div>
  );
};
export default Breakdown;
