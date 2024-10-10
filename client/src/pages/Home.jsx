import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useEffect } from "react";

const Home = () => {
  const { loading, auth, setLoading } = useGlobalContext();
  const navigate = useNavigate();
  const refresh = useRefreshToken();

  return <div>Home</div>;
};
export default Home;
