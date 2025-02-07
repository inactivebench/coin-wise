import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Error from "@/pages/Error";
import Home from "@/pages/Home";
import PersistLogin from "@/components/auth/PersistLogin";
import RequireAuth from "@/components/auth/RequireAuth";
import Unauthorized from "@/components/auth/Unauthorized";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Analytics from "@/pages/Analytics";
import TransactionHistory from "@/components/transaction/TransactionHistory";
import SpendingBreakdown from "@/components/transaction/SpendingBreakdown";
import Budgets from "./pages/Budgets";
import BudgetInfo from "./components/budget-tracking/BudgetInfo";

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
            <Route path='/budgets' element={<Budgets />} />
            <Route path='/budgetInfo' element={<BudgetInfo />} />
          </Route>
        </Route>

        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
          >
            <Route path='/analytics/' element={<Analytics />}>
              <Route path='transaction' element={<TransactionHistory />} />
              <Route path='spending' element={<SpendingBreakdown />} />
            </Route>
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
