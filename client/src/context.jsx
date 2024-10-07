import { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const AUTH_URL = "http://localhost:5000/users/auth";

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const handleAuth = async () => {
    try {
      const response = await axios
        .get(AUTH_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (!response.data.auth) {
            setIsAuth(false);
            throw err;
          } else {
            setLoading(false);
            setIsAuth(true);
            console.log(response.data.message);
          }
        });
    } catch (error) {
      if (!error?.response) {
        console.log("No Server Response");
      } else if (error.response?.status === 400) {
        console.log(error);
      } else if (error.response?.status === 403) {
        console.log("Unauthorized");
      } else {
        console.log("Sign in Failed");
      }
    }
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
  }, []);
  return (
    <AppContext.Provider value={{ loading, token, isAuth, handleAuth }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
