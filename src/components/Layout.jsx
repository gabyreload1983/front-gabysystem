import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import SideBar from "./SideBar";

export default function Layout() {
  return (
    <div className="site-wrapper">
      <div className="container-fluid m-0 p-0">
        <NavBar />
        <div className="row m-0">
          <div className="col-md-3 col-lg-2 bg-dark p-2">
            <SideBar />
          </div>
          <div className="col-md-9 col-lg-10">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
