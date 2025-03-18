import { useEffect, useState } from "react";
import Sidebar from "@/components/ui/Sidebar";
import useAxiosPrivate from "@/hook/useAxiosPrivate";
import useAuth from "@/hook/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

const BudgetInfo = () => {
  const params = useParams();
  const BUDGET_URL = `/budget/${params.budgetId}`;
  const [budget, setBudget] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const fetchBudgetInfo = async () => {
    try {
      setLoading(true);
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
            setBudget(response.data);
            setLoading(false);
          }
        });
    } catch (err) {
      console.error(err);
      setLoading(false);
      throw err;
    }
  };

  useEffect(() => {
    fetchBudgetInfo();
  }, []);
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
          {loading && <p>Loading...</p>}
          {budget.length !== 0 && !loading && (
            <div className='budget-details-container'>
              <div className='detail-head '>
                <h1>{budget[0].budget_title}</h1>
              </div>
              <div className='date-start fs-300'>
                <h2 className='capitalize bold'>start date</h2>
                <p>
                  {new Date(budget[0].start_date).toLocaleString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className='date-end fs-300'>
                <h2 className='capitalize bold'>end date</h2>
                <p>
                  {new Date(budget[0].end_date).toLocaleString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className='viewing-date-container fs-300'>
                <p className='capitalize bold '>viewing dates</p>
                <div className='date-range flex'>
                  <h3>
                    {new Date(budget[0].start_date).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </h3>
                  <p>to</p>
                  <h3>
                    {" "}
                    {new Date(budget[0].end_date).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </h3>
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
                <p>{budget[0].budget_description}</p>
              </div>
              <div className='budget-break'></div>
              <div className='stat-info'>
                <h3>You are within your budget! nice job!</h3>
                <p>
                  You have{" "}
                  <span className='bold'>
                    ${budget[0].budget_amount - budget[0].current_amount}
                  </span>{" "}
                  left in this budget. Don't forget to take into account your
                  upcoming expenses.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default BudgetInfo;
