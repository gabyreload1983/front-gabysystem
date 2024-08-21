import { NavLink, Outlet } from "react-router-dom";
import {
  ArrowPathRoundedSquareIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import { validateUserRole } from "../../utils/validation";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function Subscribers() {
  const { user } = useContext(UserContext);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <div className="d-flex flex-row text-white bg-dark m-2 rounded-2">
            <NavLink
              className="navLink d-flex flex-fill justify-content-center align-items-center gap-2 p-2"
              to="list"
            >
              <ListBulletIcon className="icon" />
              LISTA
            </NavLink>
            {validateUserRole(user, "premium") && (
              <NavLink
                className="navLink d-flex flex-fill justify-content-center align-items-center gap-2 p-2"
                to="add-remove"
              >
                <ArrowPathRoundedSquareIcon className="icon" />
                AGREGAR / QUITAR
              </NavLink>
            )}
          </div>
        </div>
        <div className="col-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
