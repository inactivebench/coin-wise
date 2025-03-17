import { useEffect, useState } from "react";
import Sidebar from "@/components/ui/Sidebar";
import "@/css/budgets.css";
import { FaPlus } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "@/hook/useAxiosPrivate";
import useAuth from "@/hook/useAuth";
import Budget from "@/components/budget-tracking/Budget";
const Budgets = () => {
  const BUDGET_URL = "/budget";
  const navigate = useNavigate();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [budgetData, setBudgetData] = useState([]);

  const handleFetch = async () => {
    try {
      const response = await axiosPrivate
        .get(BUDGET_URL, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        })
        .then((response) => {
          if (!response?.data) {
            throw err;
          } else {
            setBudgetData(response.data);
          }
        });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);
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
          <div className='budget-list-container '>
            {budgetData.map((budget) => {
              return <Budget budget={budget} key={budget.budget_id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Budgets;
