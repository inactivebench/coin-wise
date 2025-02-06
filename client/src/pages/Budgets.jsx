import Sidebar from "@/components/ui/Sidebar";
import "@/css/budgets.css";

const Budgets = () => {
  return (
    <div className=' grid-container'>
      <Sidebar pageTitle={"budgets"} />
      <div className=' main-content'>
        <h1>Budgets</h1>
      </div>
    </div>
  );
};
export default Budgets;
