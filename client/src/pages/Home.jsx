import { useNavigate } from "react-router-dom";
import useLogout from "../hook/useLogout";
import Users from "../components/Users";

const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const SignOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div>
      <h1>Home</h1>
      <Users />
      <br />
      <button className='btn' onClick={SignOut}>
        Sign out
      </button>
    </div>
  );
};
export default Home;
