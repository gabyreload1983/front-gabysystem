import { HomeIcon } from "@heroicons/react/24/outline";
import { Navigate, NavLink } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <h2 className="bg-danger">
        No tienes permisos para ingresar a esta pagina.
      </h2>
      <NavLink className="btn btn-success" to="/">
        Inicio
      </NavLink>
    </div>
  );
}
