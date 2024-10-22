import { MdDashboardCustomize } from "react-icons/md";

const SidebarMenu = ({ menu, isOpen }) => {
  const { title, icon, link } = menu;

  return (
    <li className='flex capitalize text-white sidebar-menu'>
      <img src={icon} alt={`${title} icon`} />
      <span className={`${!isOpen && "hidden"}`}>{title}</span>
    </li>
  );
};
export default SidebarMenu;
