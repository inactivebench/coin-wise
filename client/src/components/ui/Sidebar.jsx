import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import control from "@/assets/icons/control.png";
import logo from "@/assets/images/coin.svg";
import { FaHome, FaCoins } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { IoBarChartSharp } from "react-icons/io5";
import Header from "./Header";
import "@/css/sidebar.css";
import { FaC } from "react-icons/fa6";

const sidebarMenuList = [
  { title: "home", icon: <FaHome size={28} />, path: "/home" },
  {
    title: "dashboard",
    icon: <IoMdAnalytics size={28} />,
    path: "/dashboard",
  },
  {
    title: "budgets",
    icon: <FaCoins size={28} />,
    path: "/budgets",
  },
  {
    title: "analytics",
    icon: <IoBarChartSharp size={28} />,
    path: "/analytics/transaction",
  },
];

const Sidebar = ({ pageTitle }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1040) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header pageTitle={pageTitle} location={location} />
      <aside
        className={` sidebar bg-grey  ${isOpen ? "open" : "close "} fs-400`}
        aria-label='sidebar'
      >
        <img
          src={control}
          className={`sidebar-toggle  ${isOpen ? "open" : "close "}`}
          aria-label='sidebar-toggle'
          onClick={() => setIsOpen(!isOpen)}
        />
        <div className='flex sidebar-header '>
          <img src={logo} className={`${isOpen && "open"}`} />
          <h1 className={`sidebar-header-title ${!isOpen && "close"}`}>
            Coin-wise
          </h1>
        </div>
        <ul className='flex sidebar-menu-list '>
          {sidebarMenuList.map((menu, index) => {
            return <SidebarMenu menu={menu} key={index} isOpen={isOpen} />;
          })}
        </ul>
      </aside>
    </>
  );
};
export default Sidebar;
