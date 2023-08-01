import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext";
import SearchOrder from "./SearchOrder";
import { renderByRole } from "../utils";

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
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/orders/search/pending-pc"
                  style={({ isActive }) =>
                    isActive ? activeStylesOrders : null
                  }
                >
                  Pc Pendientes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/orders/search/pending-imp"
                  style={({ isActive }) =>
                    isActive ? activeStylesOrders : null
                  }
                >
                  Impresoras Pendientes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/orders/search/in-process"
                  style={({ isActive }) =>
                    isActive ? activeStylesOrders : null
                  }
                >
                  En Proceso
                </NavLink>
              </li>
              {renderByRole(user, "saler") && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/orders/search/to-deliver"
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
                      to="/orders/search/final-disposition"
                      style={({ isActive }) =>
                        isActive ? activeStylesOrders : null
                      }
                    >
                      Disposicion Final
                    </NavLink>
                  </li>
                </>
              )}
              {renderByRole(user, "technical") && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={`/orders/search/technical-${user.code_technical}`}
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
            <SearchOrder />
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}
