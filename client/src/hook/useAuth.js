import { useDebugValue } from "react";
import { useGlobalContext } from "@/context";

const useAuth = () => {
  const { auth, setAuth } = useGlobalContext();
  useDebugValue(auth, (auth) => (auth?.email ? "Logged In" : "Logged Out"));
  return useGlobalContext();
};

export default useAuth;
