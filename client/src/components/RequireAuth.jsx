import { Outlet, useLocation, Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { jwtDecode } from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;

  const roles = decoded?.userInfo.roles || [];

  return allowedRoles?.includes(roles) ? (
    <Outlet /> // returns child components of RequireAuth
  ) : auth?.accessToken ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};
export default RequireAuth;
