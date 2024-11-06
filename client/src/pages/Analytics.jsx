import Sidebar from "@/components/ui/Sidebar";
import "@/css/analytics.css";
import { Link, Outlet, useLocation } from "react-router-dom";
const Analytics = () => {
  const location = useLocation();
  return (
    <div className='grid-container'>
      <Sidebar pageTitle={"Analytics"} />
      <div className='main-content analytics-container'>
        <nav className='analytics-nav'>
          <ul className='flex analytics-nav-links'>
            <li
              className={`analytics-nav-link ${
                location.pathname === "/analytics/transaction" && "active"
              }`}
            >
              <Link to={"/analytics/transaction"}>transaction history</Link>
            </li>
            <li
              className={`analytics-nav-link ${
                location.pathname === "/analytics/spending" && "active"
              }`}
            >
              <Link to={"/analytics/spending"}>spending breakdown</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};
export default Analytics;
