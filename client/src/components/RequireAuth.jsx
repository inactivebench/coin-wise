import { Outlet, useLocation, Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.email ? (
    <Outlet /> // returns child components of RequireAuth
  ) : (
    <Navigate to='/signin' state={{ from: location }} replace />
  );
};
export default RequireAuth;
