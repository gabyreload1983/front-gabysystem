import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { validateUserRole } from "../utils";

function NavBar() {
  const { user, logoutUserContext } = useContext(UserContext);
  const navigate = useNavigate();

  const activeStyles = {
    color: "#fff",
  };

  const logout = async () => {
    await logoutUserContext();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          GabySystem
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {user && (
            <ul className="navbar-nav">
              {validateUserRole(user, "admin") && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="register"
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="users"
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                      Users
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="customers"
                  style={({ isActive }) => (isActive ? activeStyles : null)}
                >
                  Customers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="products"
                  style={({ isActive }) => (isActive ? activeStyles : null)}
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="orders"
                  style={({ isActive }) => (isActive ? activeStyles : null)}
                >
                  Orders
                </NavLink>
              </li>
              {validateUserRole(user, "premium") && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="statistics"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                  >
                    Estadisticas
                  </NavLink>
                </li>
              )}
            </ul>
          )}

          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="profile"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                  >
                    {user.first_name} {user.last_name}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" onClick={logout}>
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="login"
                  style={({ isActive }) => (isActive ? activeStyles : null)}
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
