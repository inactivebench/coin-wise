import { useEffect, useState } from "react";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

const Users = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();

  const getUsers = async () => {
    try {
      const response = await axiosPrivate.get("/users", {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      setUsers(response?.data);
    } catch (err) {
      console.error(err);
      navigate("/signin ", { state: { from: location }, replace: true });
    }
  };
  useEffect(() => {
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
