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
          GabySystem - V{import.meta.env.VITE_VERSION}
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
      </div>
    </nav>
  );
}

export default NavBar;
