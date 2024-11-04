import Sidebar from "../components/ui/Sidebar";

const Dashboard = () => {
  return (
    <div className=' grid-container'>
      <Sidebar pageTitle={"dashboard"} />
      <div className=' main-content'>
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};
export default Dashboard;
