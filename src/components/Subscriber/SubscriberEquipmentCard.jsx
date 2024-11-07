import { SwalQuestion } from "../../utils/alerts";

export default function SubscriberEquipmentCard({
  equipment,
  subscriberCode,
  onHandleRemoveEquipment,
}) {
  const handleRemoveEquipment = async () => {
    const answer = await SwalQuestion(
      "Seguro que quieres eliminar este equipo del abono???"
    );
    if (answer) {
      onHandleRemoveEquipment(equipment, subscriberCode);
    }
  };
  return (
    <div className="bg-secondary rounded p-3 mb-3 d-flex flex-column">
      <p>UUID: {equipment.uuid}</p>
      <p>TIPO: {equipment.equipment_type}</p>
      <p>NOMBRE: {equipment.name}</p>
      <p>OBSERVACION: {equipment.observation}</p>
      <button onClick={handleRemoveEquipment} className="btn btn-danger btn-sm">
        X
      </button>
    </div>
  );
}
