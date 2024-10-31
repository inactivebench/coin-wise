import { useEffect, useState, useMemo } from "react";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import useAuth from "../hook/useAuth";
import { jwtDecode } from "jwt-decode";
import { FaPlus, FaCheckCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";

import { IoFilterSharp } from "react-icons/io5";
import useInput from "../hook/useInput";
import { categories } from "../data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let PageSize = 10;

const Transaction = () => {
  const URL = "/users/transaction";
  const NEW_URL = "/users/add/transaction";

  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [transaction, setTransaction] = useState("");
  const [amount, setAmount] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [searchTerm, resetSearchTerm, searchAttributes] = useInput(
    "search",
    ""
  );
  const onClose = () => {
    setSuccess(false);
  };
  const fetchTableData = async () => {
    try {
      const response = await axiosPrivate
        .get(URL, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        })
        .then((response) => {
          if (!response?.data) {
            throw err;
          } else {
            setTableData(response.data);
          }
        });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
    const userId = decoded.userInfo.userId;
    const dateTime = date.toISOString();
    const newData = {
      userId,
      transaction,
      amount,
      cost,
      dateTime,
      category: category || "Food",
    };
    try {
      const response = await axiosPrivate.post(
        NEW_URL,
        { newData },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response?.status === 201) {
        setTransaction("");
        setAmount("");
        setCost("");
        setDate(new Date());
        setIsOpen(false);
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
  useEffect(() => {
    fetchTableData();
  }, []);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return tableData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, tableData]);

  return (
    <div className=' grid-container'>
      <Sidebar pageTitle={"Transaction History"} />
      <div className=' main-content '>
        <div className='container transaction-container flex'>
          <h1>Transaction</h1>
          <div className='flex transaction-filter-container'>
            <input
              className=' search-input'
              type='text'
              id='search'
              autoComplete='off'
              {...searchAttributes}
              placeholder='search...'
            />
            <div className='flex'>
              <button
                className='btn new-transaction flex capitalize'
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <FaPlus />
                <span>new</span>
              </button>
              <button className='btn filter flex capitalize'>
                <IoFilterSharp />
                <span>filter</span>
              </button>
            </div>
          </div>
          {/* add transaction form  */}
          <form
            className={`add-transaction-form ${!isOpen ? "hide" : "show"} flex`}
            onSubmit={handleSubmit}
          >
            <h2 className='capitalize'>add new transaction</h2>
            <div className='flex'>
              <input
                type='text'
                id='transaction'
                onChange={(e) => setTransaction(e.target.value)}
                value={transaction}
                className='input'
                placeholder='Transaction description'
                required
              />
              <input
                type='number'
                id='amount'
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                className='input'
                placeholder='Amount spent'
                required
              />
              <input
                type='number'
                id='transaction-cost'
                onChange={(e) => setCost(e.target.value)}
                value={cost}
                className='input'
                placeholder='Transaction cost'
                required
              />
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                showTimeSelect
                timeIntervals={5}
                timeFormat='HH:mm'
                dateFormat='MMMM d, yyyy h:mm aa'
              />
              <select
                id='category'
                className='input'
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {categories.map((category, index) => {
                  return (
                    <option value={category} key={index}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='flex btn-add-container'>
              <button
                className='btn cancel-btn capitalize'
                onClick={() => setIsOpen(false)}
              >
                cancel
              </button>
              <button className='btn submit-btn capitalize'>submit</button>
            </div>
          </form>
          <div className={`alert-card flex ${success ? "show" : ""} success `}>
            <FaCheckCircle size={80} />
            <p>You successfully added a new transaction</p>
            <span onClick={onClose}>
              <MdClose size={28} />
            </span>
          </div>
          <Table tableData={currentTableData} />
          <Pagination
            className='pagination-bar'
            currentPage={currentPage}
            totalCount={tableData.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};
export default Transaction;
