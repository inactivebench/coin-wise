import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import Sidebar from "../ui/Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateBudget = () => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState("daily");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const budgetData = {
      title,
      amount,
      description,
      startDate: date,
      endDate: endDate,
    };
    setDate("");
    setTitle("");
    setAmount("");
    setDescription("");
    setSelected("daily");

    console.log(values);
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
            <DatePicker
              showIcon
              className='budget-datepicker'
              selected={date}
              onChange={(date) => setDate(date)}
              placeholderText=' mm / dd / yy'
              required
            />
            <button className='capitalize submit-btn fs-300'>submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateBudget;
