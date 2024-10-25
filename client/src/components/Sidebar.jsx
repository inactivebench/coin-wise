import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useLogout from "../hook/useLogout";
import SidebarMenu from "./SidebarMenu";
import control from "../assets/icons/control.png";
import logo from "../assets/images/coin.svg";
import { TbLogout2 } from "react-icons/tb";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import Modal from "./Modal";
import Header from "./Header";

const sidebarMenuList = [
  { title: "home", icon: <FaIcons.FaHome size={28} />, path: "/home" },
  {
    title: "dashboard",
    icon: <IoIcons.IoMdAnalytics size={28} />,
    path: "/dashboard",
  },
  {
    title: "setting",
    icon: <IoIcons.IoMdSettings size={28} />,
    path: "/setting",
  },
];
const Sidebar = ({ pageTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();
  const [isOpen, setIsOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

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
    <>
      <Header pageTitle={pageTitle} />
      <aside
        className={`sidebar bg-grey  ${isOpen ? "open" : "close "} fs-400`}
        aria-label='sidebar'
      >
        <img
          src={control}
          className={`sidebar-toggle  ${isOpen ? "open" : "close "}`}
          onClick={() => setIsOpen(!isOpen)}
        />
        <div className='flex sidebar-header '>
          <img src={logo} className={`${open && "open"}`} />
          <h1 className={`sidebar-header-title ${!isOpen && "close"}`}>
            Coin-wise
          </h1>
        </div>
        <ul>
          {sidebarMenuList.map((menu, index) => {
            return <SidebarMenu menu={menu} key={index} isOpen={isOpen} />;
          })}
        </ul>
        <div>
          <li
            className={`flex capitalize text-white sidebar-menu ${
              !isOpen && "hidden"
            } ${location.pathname === "/profile" && "active"}`}
            data-hover='profile'
          >
            <Link to='/profile' className='flex link'>
              <FaIcons.FaRegUser size={28} />
              <span className={`${!isOpen && "hidden"}`}>profile</span>
            </Link>
          </li>
          <li
            className={`flex capitalize text-white logout sidebar-menu ${
              !isOpen && "hidden"
            }`}
            data-hover='sign out'
            onClick={openModal}
          >
            <TbLogout2 size={28} />
            <span className={` ${!isOpen && "hidden"}`}>sign out</span>
          </li>
        </div>
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          modalTitle={"Sign out ?"}
        >
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
      </aside>
    </>
  );
};
export default Sidebar;
