import { useContext } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar/SideBar";
import { UserContext } from "../context/userContext";
import Login from "../pages/Login/Login";

export default function Layout() {
  const { user } = useContext(UserContext);

  return (
    <div className="container-fluid m-0 p-0 bg-secondary min-vh-100">
      <NavBar />
      <main className="row">
        <div className="col-xl-3 col-xxl-2">{user && <SideBar />}</div>
        <div className="col-xl-9 col-xxl-10">
          {user ? <Outlet /> : <Login />}
        </div>
      </main>
    </div>
  );
}
