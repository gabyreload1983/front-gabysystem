import { NavLink, Outlet } from "react-router-dom";

export default function Alexis() {
  return (
    <div className="container-fluid">
      <div className="row p-3">
        <div className="col">
          <NavLink
            className={({ isActive }) =>
              isActive ? "px-3 py-2 navLink navLinkActive" : "px-3 py-2 navLink"
            }
            to="sales"
          >
            VENTAS
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "px-3 py-2 navLink navLinkActive" : "px-3 py-2 navLink"
            }
            to="account"
          >
            CUENTA
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "px-3 py-2 navLink navLinkActive" : "px-3 py-2 navLink"
            }
            to="payment"
          >
            PAGOS
          </NavLink>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
