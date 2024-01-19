import { Link, Outlet } from "react-router-dom";

export default function Alexis() {
  return (
    <div className="container-fluid">
      <div className="row p-3">
        <div className="col">
          <Link className="p-3 navLink" to="sales">
            VENTAS
          </Link>
          <Link className="p-3 navLink" to="account">
            CUENTA
          </Link>
          <Link className="p-3 navLink" to="payment">
            PAGOS
          </Link>
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
