import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useEffect } from "react";

const Home = () => {
  const { loading, isAuth, handleAuth } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    handleAuth();

    if (!isAuth) {
      navigate("/signin");
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <div>Home</div>;
};
export default Home;
