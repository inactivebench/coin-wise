import { useEffect, useState } from "react";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users");
        // console.log(response.data[0]);
        const data = response.data;
        setUsers(data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getUsers();
  }, []);
  return (
    <article>
      <h2>Users List</h2>

      {users?.length ? (
        <ul>
          {users.map((user) => {
            return <li key={user.user_id}>{user.username}</li>;
          })}
        </ul>
      ) : (
        <p>no users to display</p>
      )}
    </article>
  );
};
export default Users;
