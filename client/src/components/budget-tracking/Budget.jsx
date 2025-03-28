import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import ProgressBar from "@/components/budget-tracking/ProgressBar";
import { useGlobalContext } from "@/context";

const Budget = ({ budget }) => {
  const { budget_title, budget_amount, current_amount } = budget;
  const { convertAmount } = useGlobalContext();
  return (
    <div className=' budget-card-container'>
      <Link to={`/budgetInfo/${budget.budget_id}`} className='budget-link'>
        <div className='budget-card'>
          <p className='options'>
            <BsThreeDots />
          </p>
          <h2 className='capitalize budget-title'>{budget_title}</h2>
          <ProgressBar
            label='Phone'
            current={current_amount}
            total={budget_amount}
          />
          <div className='progress-amount-container'>
            <p className='amount-top'>{convertAmount(current_amount, 0)}</p>
            <h2 className='amount-slash'>/</h2>
            <p className='amount-bottom'>{convertAmount(budget_amount, 0)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default Budget;
