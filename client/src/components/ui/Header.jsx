import { useState } from "react";
import useAuth from "@/hook/useAuth";
import useLogout from "@/hook/useLogout";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import Modal from "./Modal";
import "@/css/header.css";

const Header = ({ pageTitle, location }) => {
  const [dropdown, setDropdown] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);
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
      <div className='flex header-info'>
        <div
          className='flex header-notification'
          onClick={() => {
            setNotificationDropdown(!notificationDropdown);
          }}
        >
          <IoMdNotificationsOutline size={29} aria-label='notification icon' />
        </div>
        <div
          className='flex header-profile'
          onClick={() => {
            setDropdown(!dropdown);
          }}
        >
          <h2 className='capitalize fs-300'>{user.slice(0, 1)}</h2>
        </div>
      </div>
      {notificationDropdown && (
        <div className='notification-dropdown'>
          <div className='dropdown-header'>
            <h2 className='capitalize'>notification</h2>
          </div>
          <div className='flex notification-container'>
            <IoMdNotificationsOutline
              size={100}
              aria-label='notification icon'
            />
            <p>Your notifications live here</p>
          </div>
        </div>
      )}
      {dropdown && (
        <div className='dropdown-menu'>
          <div className='flex dropdown-header'>
            <div className='flex header-profile'>
              <h2 className='capitalize fs-300'>{user.slice(0, 1)}</h2>
            </div>
            <div>
              <h2>{user}</h2>
              <p>user email</p>
            </div>
          </div>
          <ul className='flex dropdown-links'>
            <li
              className={`flex capitalize dropdown-link  ${
                location.pathname === "/profile" && "active"
              }`}
            >
              <Link to='/profile' className='flex link'>
                <FaIcons.FaRegUser size={20} />
                <span className='fs-400'>profile</span>
              </Link>
            </li>
            <li
              className={`flex capitalize logout dropdown-link `}
              onClick={openModal}
            >
              <TbLogout2 size={20} />
              <span className='fs-400'>sign out</span>
            </li>
          </ul>
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={closeModal} modalTitle={"Sign out ?"}>
        <div className='flex modal-body'>
          <h2>Do you want to sign out ?</h2>
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
