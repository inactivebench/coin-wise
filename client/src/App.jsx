import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import Home from "./pages/Home";
import PersistLogin from "./components/PersistLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        {/* Public routes */}
        <Route path='*' element={<Error />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />

        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route path='/home' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
