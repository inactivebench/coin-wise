import Sidebar from "@/components/ui/Sidebar";
import "@/css/budgets.css";
import { FaPlus } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import ProgressBar from "@/components/budget-tracking/ProgressBar";
const Budgets = () => {
  const navigate = useNavigate();
  return (
    <div className=' grid-container'>
      <Sidebar pageTitle={"budgets"} />
      <div className=' main-content'>
        <div className='flex budgets-container '>
          <div className='flex'>
            <h1>Budgets</h1>
            <button
              className='new-btn'
              onClick={() => {
                navigate("/createBudget");
              }}
            >
              <FaPlus size={12} />
            </button>
          </div>
          <div className='flex info-banner'>
            <p>options</p>
            <p>
              date{" "}
              <span>
                <SlCalender />
              </span>
            </p>
          </div>
          <div className='budget-list-container'>
            <div className=' budget-card-container'>
              <Link to='/budgetInfo' className='budget-link'>
                <div className='budget-card'>
                  <p className='options'>
                    <BsThreeDots />
                  </p>
                  <h2 className='capitalize budget-title'>title</h2>
                  <ProgressBar label='Phone' current={10} total={100} />
                  <div className='progress-amount-container'>
                    <p className='amount-top'>$10</p>
                    <h2 className='amount-slash'>/</h2>
                    <p className='amount-bottom'>100</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Budgets;
