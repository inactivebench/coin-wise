import Sidebar from "@/components/ui/Sidebar";

const Profile = () => {
  return (
    <div className=' grid-container'>
      <Sidebar pageTitle={"profile"} />
      <div className=' main-content'>
        <h1>Tuko kwenye profile</h1>
      </div>
    </div>
  );
};
export default Profile;
