import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
import useLogout from "../hook/useLogout";
import Loading from "../components/Loading";
import { useEffect } from "react";

const Home = () => {
  const { loading, auth, setLoading } = useGlobalContext();
  const navigate = useNavigate();
  const logout = useLogout();

  const SignOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div>
      <h1>Home</h1>
      <button className='btn' onClick={SignOut}>
        Sign out
      </button>
    </div>
  );
};
export default Home;
