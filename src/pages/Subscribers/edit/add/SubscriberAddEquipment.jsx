import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubscriber, updateSubscriber } from "../../../../utils/data";
import { SwalError, SwalToast } from "../../../../utils/alerts";
import FormAdEquipment from "./FormAdEquipment";

export default function SubscriberAddEquipment() {
  const { id } = useParams();
  const [subscriber, setSubscriber] = useState(null);

  const getData = async () => {
    const data = await getSubscriber({ code: id });
    if (!data) return;
    setSubscriber(data);
  };

  const handleAddEquipment = async (newEquipment) => {
    const index = subscriber.equipments.findIndex(
      (equipment) => equipment.mac === newEquipment.mac
    );
    if (index !== -1) {
      await SwalError("La mac ya existe");
      return false;
    }

    const equipmentsUpdate = [...subscriber.equipments, newEquipment];
    const subscriberUpdate = { ...subscriber, equipments: equipmentsUpdate };
    const response = await updateSubscriber(id, subscriberUpdate);
    if (!response) return;
    SwalToast("Se agrego equipo!", 700);
    return true;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container-fluid">
      {subscriber && (
        <div className="row bg-dark text-white justify-content-center p-5">
          <h2 className="text-center">
            {subscriber.code} - {subscriber.name}
          </h2>
          <div className="col-12 col-md-6">
            <FormAdEquipment onHandleAddEquipment={handleAddEquipment} />
          </div>
        </div>
      )}
    </div>
  );
}
