import { FaRegUser } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import useAuth from "../hook/useAuth";

const Header = ({ pageTitle }) => {
  const { auth } = useAuth();
  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
  const user = decoded.userInfo.user;

  return (
    <div className='header-main flex  fs-300 '>
      <h1 className='capitalize '>{pageTitle}</h1>
      <div className='flex header-info'>
        <FaRegUser />
        <h2>{user}</h2>
      </div>
    </div>
  );
};
export default Header;
