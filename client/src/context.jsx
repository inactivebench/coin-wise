import { useEffect, useContext, useState, createContext } from "react";
import axios from "./api/axios";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const apiKey = import.meta.env.VITE_RATES_API_KEY;
  const RATES_URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState({});
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState("USD");
  const [ratesFetched, setRatesFetched] = useState(false);

  const currencyRates = async () => {
    try {
      const response = await axios.get(RATES_URL).then((response) => {
        if (!response?.data?.result) {
          throw response.data.error;
        } else {
          setRates(response?.data?.conversion_rates);
          setRatesFetched(true);
        }
      });
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    currencyRates();
  }, []);

  const convertAmount = (amount, decimal) => {
    const converted = rates[currency] ? amount * rates[currency] : amount;
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: decimal === 0 ? 0 : 2,
    }).format(converted);
    return formattedAmount;
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        auth,
        setAuth,
        setIsLoading,
        ratesFetched,
        rates,
        convertAmount,
        currency,
        setCurrency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
