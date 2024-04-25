import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { NavLink, useNavigate } from "react-router-dom";
import { capitalize } from "../../utils";
import {
  ArrowLeftStartOnRectangleIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function SideBarCommon() {
  const { user, logoutUserContext } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async () => {
    await logoutUserContext();
    navigate("/login");
  };

  const links = [
    {
      name: "Ordenes",
      to: "orders",
      icon: ClipboardDocumentListIcon,
    },
    {
      name: "Productos",
      to: "products",
      icon: CubeIcon,
    },
    {
      name: "Clientes",
      to: "customers",
      icon: UserGroupIcon,
    },
  ];

  return (
    <div className="d-flex flex-row text-white flex-xl-column bg-dark m-2 rounded-2">
      <NavLink
        className="nav-link flex-fill p-2 d-flex align-items-center gap-2 flex-row justify-content-center justify-content-xl-start"
        to="profile"
      >
        {user?.imageUrl ? (
          <img
            className="img-profile-thumb"
            src={user.imageUrl}
            alt="image profile"
          />
        ) : (
          <UserCircleIcon className="icon" />
        )}
        <span className="d-none d-xl-block">
          {capitalize(user.first_name)} {capitalize(user.last_name)}
        </span>
      </NavLink>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink
            key={link.name}
            className="nav-link flex-fill p-2 d-flex align-items-center gap-2 flex-row justify-content-center justify-content-xl-start"
            to={link.to}
          >
            <Icon className="icon" />
            <p className="d-none d-xl-block">{link.name}</p>
          </NavLink>
        );
      })}
      <NavLink
        className="nav-link flex-fill p-2 d-flex align-items-center gap-2 flex-row justify-content-center justify-content-xl-start"
        onClick={logout}
      >
        <ArrowLeftStartOnRectangleIcon className="icon" />
        <p className="d-none d-xl-block">Salir</p>
      </NavLink>
    </div>
  );
}
