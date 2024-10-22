import { useState } from "react";
import SidebarMenu from "./SidebarMenu";
import { sidebarMenuList } from "../data";
import control from "../assets/icons/control.png";
import logo from "../assets/images/coin.svg";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <aside
      className={`sidebar bg-grey  ${isOpen ? "open" : "close "}`}
      aria-label='sidebar'
    >
      <img
        src={control}
        className={`sidebar-toggle  ${!isOpen && "rotate"}`}
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
  );
};
export default Sidebar;
