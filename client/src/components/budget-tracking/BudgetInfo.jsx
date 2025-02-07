import Sidebar from "@/components/ui/Sidebar";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

const BudgetInfo = () => {
  const navigate = useNavigate();
  return (
    <div className=' grid-container'>
      <Sidebar pageTitle={"budgets"} />
      <div className=' main-content'>
        <div className='budget-info-container container flex'>
          <button
            className=' back-btn capitalize ff-roboto '
            onClick={() => {
              navigate(-1);
            }}
          >
            <IoChevronBack />
            back
          </button>
          <div className='budget-details-container'>
            <div className='detail-head '>
              <h1>Phone</h1>
            </div>
            <div className='date-start fs-300'>
              <h2 className='capitalize bold'>start date</h2>
              <p>date</p>
            </div>
            <div className='date-end fs-300'>
              <h2 className='capitalize bold'>end date</h2>
              <p>date</p>
            </div>
            <div className='viewing-date-container fs-300'>
              <p className='capitalize bold '>viewing dates</p>
              <div className='date-range flex'>
                <h3>date</h3>
                <p>to</p>
                <h3>date</h3>
              </div>
            </div>
            <div className='chart-container'>
              <p className='capitalize'>Budget amount used</p>

              <div>
                <canvas
                  style={{
                    display: "block",
                    boxSizing: "border-box",
                    height: "256px",
                    width: "482px",
                    border: "1px solid red",
                  }}
                  height={256}
                  width={482}
                ></canvas>
              </div>
            </div>
            <div className='budget-description fs-300'>
              <h3 className='capitalize bold'>description</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                fugiat culpa laborum necessitatibus similique maxime delectus,
                quibusdam fugit modi quisquam?
              </p>
            </div>
            <div className='budget-break'></div>
            <div className='stat-info'>
              <h3>You are within your budget! nice job!</h3>
              <p>
                You have amount left in this budget. Don't forget to take into
                account your upcoming expenses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BudgetInfo;
