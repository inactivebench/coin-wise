import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import ProgressBar from "@/components/budget-tracking/ProgressBar";

const Budget = ({ budget }) => {
  const { budget_title, budget_amount } = budget;
  return (
    <div className=' budget-card-container'>
      <Link to='/budgetInfo' className='budget-link'>
        <div className='budget-card'>
          <p className='options'>
            <BsThreeDots />
          </p>
          <h2 className='capitalize budget-title'>{budget_title}</h2>
          <ProgressBar label='Phone' current={10} total={budget_amount} />
          <div className='progress-amount-container'>
            <p className='amount-top'>$10</p>
            <h2 className='amount-slash'>/</h2>
            <p className='amount-bottom'>{Math.round(budget_amount)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default Budget;
