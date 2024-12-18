import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addEquipment, getSubscriber } from "../../../../utils/data";
import { SwalError, SwalToast } from "../../../../utils/alerts";
import FormAddEquipment from "./FormAddEquipment";
import { UUIDExists } from "../../../../utils/validation";

export default function SubscriberAddEquipment() {
  const { id } = useParams();
  const [subscriber, setSubscriber] = useState(null);

  const getData = async () => {
    const data = await getSubscriber({ code: id });
    if (!data) return;
    setSubscriber(data);
  };

  const handleAddEquipment = async (newEquipment) => {
    if (UUIDExists(subscriber, newEquipment)) {
      await SwalError("La UUID ya existe!!!");
      return false;
    }

    const response = await addEquipment(id, newEquipment);
    if (!response) return;
    await getData();
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
            <FormAddEquipment onHandleAddEquipment={handleAddEquipment} />
          </div>
        </div>
      )}
    </div>
  );
}
