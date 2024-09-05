export default function SubscriberEquipmentCard({ equipment }) {
  return (
    <div className="bg-secondary rounded p-3 mb-3">
      <p>MAC: {equipment.mac}</p>
      <p>TIPO: {equipment.equipment_type}</p>
      <p>NOMBRE: {equipment.name}</p>
      <p>OBSERVACION: {equipment.observation}</p>
    </div>
  );
}
