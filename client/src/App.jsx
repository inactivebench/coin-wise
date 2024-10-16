import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import Home from "./pages/Home";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";

const ROLES = {
  User: 2001,
  Admin: 5150,
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
          >
            <Route path='/home' element={<Home />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
