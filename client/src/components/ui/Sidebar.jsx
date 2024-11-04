import { useState } from "react";
import { useLocation } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import control from "../assets/icons/control.png";
import logo from "../assets/images/coin.svg";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import Header from "./Header";

const sidebarMenuList = [
  { title: "home", icon: <FaIcons.FaHome size={28} />, path: "/home" },
  {
    title: "dashboard",
    icon: <IoIcons.IoMdAnalytics size={28} />,
    path: "/dashboard",
  },
  {
    title: "transaction",
    icon: <IoIcons.IoMdSettings size={28} />,
    path: "/transaction",
  },
];
const Sidebar = ({ pageTitle }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Header pageTitle={pageTitle} location={location} />
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
      </aside>
    </>
  );
};
export default Sidebar;
