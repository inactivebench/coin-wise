import { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const AUTH_URL = "http://localhost:5000/auth/userAuth";

  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const [auth, setAuth] = useState({});

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
            setAuth(false);
            throw err;
          } else {
            setIsLoading(false);
            setAuth(true);
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

  return (
    <AppContext.Provider
      value={{ isLoading, token, auth, setAuth, setIsLoading }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
