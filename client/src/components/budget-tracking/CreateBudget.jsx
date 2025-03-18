import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import Sidebar from "../ui/Sidebar";
import DatePicker from "react-datepicker";
import useAxiosPrivate from "@/hook/useAxiosPrivate";
import useAuth from "@/hook/useAuth";
import "react-datepicker/dist/react-datepicker.css";
import { jwtDecode } from "jwt-decode";
import Alert from "../ui/Alert";

const CreateBudget = () => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState("daily");
  const [success, setSuccess] = useState(false);

  const CREATE_BUDGET_URL = "/budget/add";
  const navigate = useNavigate();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
    const userId = decoded.userInfo.userId;
    let endDate = "";
    if (selected === "daily") {
      const day = 1;
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + day);
      endDate = newDate;
    } else if (selected === "weekly") {
      const days = 7;
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + days);
      endDate = newDate;
    } else if (selected === "monthly") {
      const month = 1;
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() + month);
      endDate = newDate;
    } else if (selected === "yearly") {
      const year = 1;
      const newDate = new Date(date);
      newDate.setFullYear(date.getFullYear() + year);
      endDate = newDate;
    }

    const budgetData = {
      userId,
      title,
      amount,
      description,
      startDate: date,
      endDate: endDate,
    };
    console.log({ budgetData });

    try {
      const response = await axiosPrivate.post(
        CREATE_BUDGET_URL,
        { budgetData },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response?.status === 201) {
        setDate(new Date());
        setTitle("");
        setAmount("");
        setDescription("");
        setSelected("daily");
        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
        }, 3800);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return (
    <div className='grid-container'>
      <Sidebar pageTitle={"budgets"} />
      <div className='main-container'>
        <div className='create-budget-container '>
          <button
            className=' back-btn capitalize ff-roboto '
            onClick={() => {
              navigate(-1);
            }}
          >
            <IoChevronBack />
            cancel
          </button>
          <h1 className='budget-title capitalize'>create budget</h1>

          <form className='budget-form flex' onSubmit={handleSubmit}>
            <div className='flex'>
              <div>
                <label htmlFor='title' className='label capitalize'>
                  title
                </label>
                <input
                  type='text'
                  id='title'
                  className='budget-input'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor='amount' className='label capitalize'>
                  amount
                </label>
                <input
                  type='number'
                  id='amount'
                  className='budget-input'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor='description' className='label capitalize'>
                description
              </label>
              <textarea
                type='text'
                id='description'
                className='budget-desc'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className='flex'>
              <p className='capitalize'>budget start date : </p>
              <DatePicker
                showIcon
                className='budget-datepicker'
                selected={date}
                onChange={(date) => setDate(date)}
                placeholderText=' mm / dd / yy'
                required
              />
            </div>
            <p>Choose how long your budget period will be:</p>
            <div className='period-div flex'>
              <input
                type='radio'
                name='radio'
                className='radio-input'
                id='daily'
                value='daily'
                checked={selected === "daily"}
                onChange={(e) => setSelected(e.target.value)}
              />
              <label htmlFor='daily' className='radio-label capitalize'>
                one day
              </label>
              <input
                type='radio'
                name='radio'
                className='radio-input'
                id='weekly'
                value='weekly'
                onChange={(e) => setSelected(e.target.value)}
              />
              <label htmlFor='weekly' className='radio-label capitalize'>
                one week
              </label>
              <input
                type='radio'
                name='radio'
                className='radio-input'
                id='monthly'
                value='monthly'
                onChange={(e) => setSelected(e.target.value)}
              />
              <label htmlFor='monthly' className='radio-label capitalize'>
                one month
              </label>
              <input
                type='radio'
                name='radio'
                className='radio-input'
                id='yearly'
                value='yearly'
                onChange={(e) => setSelected(e.target.value)}
              />
              <label htmlFor='yearly' className='radio-label capitalize'>
                one year
              </label>
            </div>
            <button className='capitalize submit-btn fs-300'>submit</button>
          </form>
        </div>
        <Alert
          alertType={"success"}
          message={"New Budget item successfully created"}
          success={success}
          setSuccess={setSuccess}
        />
      </div>
    </div>
  );
};
export default CreateBudget;
