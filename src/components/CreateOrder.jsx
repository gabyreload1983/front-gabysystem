import { NavLink } from "react-router-dom";
import { validateCreateServiceWork } from "../utils/validation";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

export default function CreateOrder() {
  const { user } = useContext(UserContext);
  return (
    <>
      {validateCreateServiceWork(user) && (
        <NavLink
          className="navLink flex-fill rounded py-2 px-3 d-flex align-items-center gap-2 flex-row justify-content-center"
          to="/servicework/create"
        >
          <PlusCircleIcon className="icon" />
          <p className="d-none d-xl-block m-0">Crear</p>
        </NavLink>
      )}
    </>
  );
}
