import { NavLink } from "react-router-dom";
import { validateUserRole } from "../../utils/validation";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { ROLES } from "../../constants";

export default function SubscriberEquipmentCard({ equipment, subscriberCode }) {
  const { user } = useContext(UserContext);
  return (
    <div className="bg-secondary rounded p-3 mb-3 d-flex flex-column">
      <p>UUID: {equipment.uuid}</p>
      <p>TIPO: {equipment.equipment_type}</p>
      <p>NOMBRE: {equipment.name}</p>
      <p>OBSERVACION: {equipment.observation}</p>
      {validateUserRole(user, ROLES.PREMIUM) && (
        <NavLink
          className="btn btn-warning btn-sm mb-2"
          to={`edit-equipment/${equipment.uuid}`}
        >
          Editar
        </NavLink>
      )}
    </div>
  );
}
