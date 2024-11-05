import { useEffect, useState, useMemo } from "react";
import "@/css/transaction.css";
import Pagination from "@/components/ui/Pagination";
import Sidebar from "@/components/ui/Sidebar";
import Table from "@/components/ui/Table";
import Alert from "@/components/ui/Alert";
import useAxiosPrivate from "@/hook/useAxiosPrivate";
import useAuth from "@/hook/useAuth";
import { jwtDecode } from "jwt-decode";
import { FaPlus, FaCheckCircle } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { categories } from "@/data";
import { incomeCategories } from "@/data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Transaction = () => {
  const GET_URL = "/transaction";
  const TRANSACTION_URL = "/transaction/add";
  const FILTER_URL = "/transaction/filter";

  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [transaction, setTransaction] = useState("");
  const [amount, setAmount] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [pageSize, setPageSize] = useState(7);

  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const handleSearchInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredItems = tableData.filter((transaction) =>
      transaction.transaction_description
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    setFilteredTransactions(filteredItems);
  };
  const fetchTableData = async () => {
    try {
      const response = await axiosPrivate
        .get(GET_URL, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        })
        .then((response) => {
          if (!response?.data) {
            throw err;
          } else {
            setTableData(response.data);
            setFilteredTransactions(response.data);
          }
        });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const addNewTransaction = async (e) => {
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
      type,
      category,
    };
    try {
      const response = await axiosPrivate.post(
        TRANSACTION_URL,
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
  const filterTransaction = async (e) => {
    e.preventDefault();
    const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
    const userId = decoded.userInfo.userId;
    const startDateTime =
      startDate === ""
        ? ""
        : new Date(startDate).toISOString().slice(0, 19).replace("T", " ");
    const endDateTime =
      endDate === ""
        ? ""
        : new Date(endDate).toISOString().slice(0, 19).replace("T", " ");
    const filterData = {
      userId,
      amount: amount || "",
      cost: cost || "",
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      type: type || "",
      category: category || "",
    };
    try {
      const response = await axiosPrivate
        .post(
          FILTER_URL,
          { filterData },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          if (!response?.data) throw err;
          setTableData(response.data);
          setFilteredTransactions(response.data);
        });
      if (response?.status === 201) {
        setAmount("");
        setCost("");
        setStartDate(new Date());
        setEndDate(new Date());
        setIsFilterOpen(false);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setPageSize(5);
      } else {
        setPageSize(7);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return filteredTransactions.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredTransactions]);

  return (
    <div className=' grid-container'>
      <Sidebar pageTitle={"Transaction History"} />
      <div className=' main-content '>
        <div className=' transaction-container flex'>
          <h2>A Detailed Record of Your Financial Activity.</h2>
          <div className='flex transaction-filter-container'>
            <input
              className=' search-input'
              type='text'
              id='search'
              autoComplete='off'
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder='Search by Transaction...'
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
              <button
                className='btn filter flex capitalize'
                onClick={() => {
                  setIsFilterOpen(!isFilterOpen);
                }}
              >
                <IoFilterSharp />
                <span>filter</span>
              </button>
            </div>
          </div>
          {/* add transaction form  */}
          <form
            className={`add-transaction-form ${!isOpen ? "hide" : "show"} flex`}
            onSubmit={addNewTransaction}
          >
            <h2 className='capitalize'>add new transaction</h2>
            <div className=' form-input-grid'>
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
                className='datepicker-input'
                selected={date}
                onChange={(date) => setDate(date)}
                showTimeSelect
                timeIntervals={5}
                timeFormat='HH:mm'
                dateFormat='MMMM d, yyyy h:mm aa'
                placeholderText='Select date and time'
                required
              />
              <select
                id='type'
                className='input'
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value='income'>income</option>
                <option value='expense'>expense</option>
              </select>
              {type === "income" ? (
                <select
                  id='category'
                  className='input'
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  {incomeCategories.map((category, index) => {
                    return (
                      <option value={category} key={index}>
                        {category}
                      </option>
                    );
                  })}
                </select>
              ) : (
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
              )}
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
          {/* {filter data form } */}
          <form
            className={`add-transaction-form ${
              !isFilterOpen ? "hide" : "show"
            } flex`}
            onSubmit={filterTransaction}
          >
            <h2 className='capitalize'>filter transactions</h2>
            <div className='form-input-grid'>
              <input
                type='number'
                id='amount'
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                className='input'
                placeholder='Amount spent'
              />
              <input
                type='number'
                id='transaction-cost'
                onChange={(e) => setCost(e.target.value)}
                value={cost}
                className='input'
                placeholder='Transaction cost'
              />
              <DatePicker
                className='datepicker-input'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                timeIntervals={5}
                timeFormat='HH:mm'
                dateFormat='MMMM d, yyyy h:mm aa'
                placeholderText='Select start date'
              />
              <DatePicker
                className='datepicker-input'
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                timeIntervals={5}
                timeFormat='HH:mm'
                dateFormat='MMMM d, yyyy h:mm aa'
                placeholderText='Select end date'
              />
              <select
                id='type'
                className='input'
                onChange={(e) => setType(e.target.value)}
              >
                <option value='income'>income</option>
                <option value='expense'>expense</option>
              </select>
              {type === "income" ? (
                <select
                  id='category'
                  className='input'
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {incomeCategories.map((category, index) => {
                    return (
                      <option value={category} key={index}>
                        {category}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <select
                  id='category'
                  className='input'
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((category, index) => {
                    return (
                      <option value={category} key={index}>
                        {category}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
            <div className='flex btn-add-container'>
              <button
                className='btn cancel-btn capitalize'
                onClick={() => setIsFilterOpen(false)}
              >
                cancel
              </button>
              <button className='btn submit-btn capitalize'>filter</button>
            </div>
          </form>
          <Alert
            alertType={"success"}
            message={"You successfully added a new transaction"}
            icon={<FaCheckCircle size={80} />}
            success={success}
            setSuccess={setSuccess}
          />
          <Table tableData={currentTableData} />
        </div>
      </div>
      <div className='footer-main'>
        <Pagination
          className='pagination-bar'
          currentPage={currentPage}
          totalCount={tableData.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};
export default Transaction;
