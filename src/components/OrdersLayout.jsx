import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext";
import OrdersGraphics from "../pages/Orders/OrdersGraphics";
import { validateUserRole } from "../utils/validation";

export default function OrdersLayout() {
  const { user } = useContext(UserContext);

  const activeStylesOrders = {
    color: "#fff",
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavOrders"
            aria-controls="navbarNavOrders"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavOrders">
            <ul className="navbar-nav">
              {validateUserRole(user, "saler", "premium") && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/orders/search?state=to-deliver"
                      style={({ isActive }) =>
                        isActive ? activeStylesOrders : null
                      }
                    >
                      Para Entregar
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/orders/search?state=final-disposition"
                      style={({ isActive }) =>
                        isActive ? activeStylesOrders : null
                      }
                    >
                      Disposicion Final
                    </NavLink>
                  </li>
                </>
              )}
              {validateUserRole(user, "technical") && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={`/orders/search?technical=${user.code_technical}`}
                      style={({ isActive }) =>
                        isActive ? activeStylesOrders : null
                      }
                    >
                      Mis Ordenes
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <OrdersGraphics />

      <Outlet />
    </div>
  );
}
