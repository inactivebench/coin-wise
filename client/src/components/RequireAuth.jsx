import { Outlet, useLocation, Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { jwtDecode } from "jwt-decode";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;

  // console.log(decoded.userInfo);

  return auth?.accessToken ? (
    <Outlet /> // returns child components of RequireAuth
  ) : (
    <Navigate to='/signin' state={{ from: location }} replace />
  );
};
export default RequireAuth;
