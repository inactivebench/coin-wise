import { useNavigate } from "react-router-dom";
import useLogout from "../hook/useLogout";
import Users from "../components/Users";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const SignOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div style={{ flexDirection: "column " }}>
        <h1>Home</h1>
        <Users />
        <br />
        <button className='btn' onClick={SignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
};
export default Home;
