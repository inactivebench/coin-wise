import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../hook/useRefreshToken";
import useAuth from "../../hook/useAuth";
import { useGlobalContext } from "../../context";
import Loading from "../Loading";

const PersistLogin = () => {
  const { isLoading, setIsLoading } = useGlobalContext();
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
};
export default PersistLogin;
