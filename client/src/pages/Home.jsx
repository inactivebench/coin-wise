import Users from "../components/home/Users";
import Sidebar from "../components/ui/Sidebar";

const Home = () => {
  return (
    <div className=' grid-container'>
      <Sidebar pageTitle={"home"} />
      <div className='flex main-content' style={{ flexDirection: "column " }}>
        <Users />
      </div>
    </div>
  );
};
export default Home;
