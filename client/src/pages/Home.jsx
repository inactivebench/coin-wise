import { useNavigate } from "react-router-dom";
import Users from "../components/Users";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='flex'>
      <Sidebar />
      <div style={{ flexDirection: "column " }}>
        <h1>Home</h1>
        <Users />
      </div>
    </div>
  );
};
export default Home;
