import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
import useLogout from "../hook/useLogout";
import Loading from "../components/Loading";
import { useEffect } from "react";
import Users from "../components/Users";

const Home = () => {
  const { isLoading, auth, setIsLoading } = useGlobalContext();
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
