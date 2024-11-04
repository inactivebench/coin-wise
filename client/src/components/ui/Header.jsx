import { useState } from "react";
import useAuth from "../../hook/useAuth";
import useLogout from "../../hook/useLogout";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import * as FaIcons from "react-icons/fa";
import Modal from "./Modal";

const Header = ({ pageTitle, location }) => {
  const [dropdown, setDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const logout = useLogout();
  const { auth } = useAuth();

  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
  const user = decoded.userInfo.user;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='header-main flex  fs-300 '>
      <h1 className='capitalize '>{pageTitle}</h1>
      <div
        className='flex header-info'
        onClick={() => {
          setDropdown(!dropdown);
        }}
      >
        <FaIcons.FaRegUser />
        <h2>{user}</h2>
      </div>
      {dropdown && (
        <div className='dropdown-menu'>
          <ul className='flex'>
            <li
              className={`flex capitalize text-white dropdown-link  ${
                location.pathname === "/profile" && "active"
              }`}
            >
              <Link to='/profile' className='flex link'>
                <FaIcons.FaRegUser size={26} />
                <span className='fs-400'>profile</span>
              </Link>
            </li>
            <li
              className={`flex capitalize text-white logout dropdown-link `}
              onClick={openModal}
            >
              <TbLogout2 size={26} />
              <span className='fs-400'>sign out</span>
            </li>
          </ul>
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={closeModal} modalTitle={"Sign out ?"}>
        <div className='flex modal-body'>
          <h2>Do you want to want to sign out ?</h2>
        </div>
        <div className='flex modal-btn'>
          <button className='capitalize cancel' onClick={closeModal}>
            cancel
          </button>
          <button className='capitalize signout' onClick={handleLogout}>
            sign out
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default Header;
