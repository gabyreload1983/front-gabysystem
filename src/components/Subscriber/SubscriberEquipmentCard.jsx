import { NavLink } from "react-router-dom";

export default function SubscriberEquipmentCard({ equipment, subscriberCode }) {
  return (
    <div className="bg-secondary rounded p-3 mb-3 d-flex flex-column">
      <p>UUID: {equipment.uuid}</p>
      <p>TIPO: {equipment.equipment_type}</p>
      <p>NOMBRE: {equipment.name}</p>
      <p>OBSERVACION: {equipment.observation}</p>
      <NavLink
        className="btn btn-warning btn-sm mb-2"
        to={`edit-equipment/${equipment.uuid}`}
      >
        Editar
      </NavLink>
    </div>
  );
}
