import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import useAuth from "../hook/useAuth";
import { useEffect, useState, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import useInput from "../hook/useInput";

let PageSize = 10;

const Transaction = () => {
  const { auth } = useAuth();
  const URL = "/users/transaction";
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [searchTerm, setSearchTerm] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const [searchTerm, resetSearchTerm, searchAttributes] = useInput(
    "search",
    ""
  );

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
              <button className='btn new-transaction flex capitalize'>
                <FaPlus />
                <span>new</span>
              </button>
              <button className='btn filter flex capitalize'>
                <IoFilterSharp />
                <span>filter</span>
              </button>
            </div>
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
