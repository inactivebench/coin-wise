import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../hook/useLogout";
import SidebarMenu from "./SidebarMenu";
import { sidebarMenuList } from "../data";
import control from "../assets/icons/control.png";
import logo from "../assets/images/coin.svg";
import profile from "../assets/icons/User.png";
import { TbLogout2 } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
const Sidebar = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside
      className={`sidebar bg-grey  ${isOpen ? "open" : "close "} fs-400`}
      aria-label='sidebar'
    >
      <img
        src={control}
        // className={`sidebar-toggle  ${!isOpen && "rotate"}`}
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
          }`}
          data-hover='profile'
        >
          <FaRegUser size={28} />
          <span className={`${!isOpen && "hidden"}`}>profile</span>
        </li>
        <li
          className={`flex capitalize text-white logout sidebar-menu ${
            !isOpen && "hidden"
          }`}
          data-hover='sign out'
          onClick={handleLogout}
        >
          <TbLogout2 size={28} />
          <span className={` ${!isOpen && "hidden"}`}>sign out</span>
        </li>
      </div>
    </aside>
  );
};
export default Sidebar;
