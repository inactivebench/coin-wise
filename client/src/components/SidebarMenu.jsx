import { useState } from "react";
import { Link } from "react-router-dom";

const SidebarMenu = ({ menu, isOpen }) => {
  const { title, icon, path } = menu;

  return (
    <li
      className={`flex capitalize text-white sidebar-menu ${
        !isOpen && "hidden"
      } `}
      data-hover={title}
    >
      <Link to={path} className='flex link sidebar-link'>
        {icon}
        <span className={`${!isOpen && "hidden"}`}>{title}</span>
      </Link>
    </li>
  );
};
export default SidebarMenu;
