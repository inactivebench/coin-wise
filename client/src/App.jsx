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
import Dashboard from "./pages/Dashboard";
import Setting from "./pages/Setting";
import Profile from "./pages/Profile";

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

        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
          >
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Route>

        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
          >
            <Route path='/setting' element={<Setting />} />
          </Route>
        </Route>

        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
          >
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
