import { NavLink, Outlet } from "react-router-dom";

export default function Alexis() {
  return (
    <div className="container-fluid">
      <div className="d-flex flex-row text-white bg-dark m-2 rounded-2">
        <NavLink className="navLink flex-fill p-2" to="sales">
          VENTAS
        </NavLink>
        <NavLink className="navLink flex-fill p-2" to="account">
          CUENTA
        </NavLink>
        <NavLink className="navLink flex-fill p-2" to="payment">
          PAGOS
        </NavLink>
      </div>
      <div className="row">
        <div className="col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
