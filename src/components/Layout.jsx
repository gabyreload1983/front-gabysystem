import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar/SideBar";
import { UserContext } from "../context/userContext";
import Login from "../pages/Login/Login";

export default function Layout() {
  const { user, logoutUserContext } = useContext(UserContext);

  return (
    <div className="container-fluid m-0 p-0">
      <NavBar />
      <div className="row p-0 m-0 vh-100">
        <div className="col-md-3 col-lg-2 bg-dark">{user && <SideBar />}</div>
        <div className="col-md-9 col-lg-10">
          {user ? <Outlet /> : <Login />}
        </div>
      </div>
    </div>
  );
}
