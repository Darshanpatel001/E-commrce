import { Button } from "@mui/material";
import React from "react";
import UserNavbar from "./user/header/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./user/pages/Home";
import AdminNavbar from "./admin/header/Navbar";
import Dashboard from "./admin/pages/Dashboard";
import Manage from "./admin/pages/Manage";
import Cart from "./user/pages/Cart";

const App = () => {
  let role = "user";

  if (role == "user") {
    return (
      <>
        <UserNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" />
          <Route path="/Cart" element={<Cart/>} />
        </Routes>
      </>
    );
  } else if (role == "admin") {
    return (
      <>
        <AdminNavbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/manage" element={<Manage />} />
        </Routes>
      </>
    );
  } else {
    return <h1>404 Not Found</h1>;
  }
};

export default App;
