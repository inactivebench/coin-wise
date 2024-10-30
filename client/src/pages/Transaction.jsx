import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import useAuth from "../hook/useAuth";
import { jwtDecode } from "jwt-decode";

const Transaction = () => {
  const { auth } = useAuth();

  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
  const id = decoded.userInfo.userId;

  return (
    <div className=' grid-container'>
      <Sidebar pageTitle={"Transaction History"} />
      <div className=' main-content'>
        <h1>Transaction</h1>
        <Table />
      </div>
    </div>
  );
};
export default Transaction;
