import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubscriber, updateSubscriber } from "../../../utils/data";
import { SwalToast } from "../../../utils/alerts";

export default function UpdateSubscriber() {
  const { id } = useParams();
  const [subscriber, setSubscriber] = useState(null);

  const handleUpdateSubscriber = async () => {
    const totalEquipments = Number(
      document.getElementById("totalEquipments").value
    );
    const subscriberUpdate = { ...subscriber, totalEquipments };

    const response = await updateSubscriber(id, subscriberUpdate);
    if (response) SwalToast(`Se actualizo cantidad de equipos!`, 1000);
  };
  const getData = async () => {
    const data = await getSubscriber({ code: id });
    if (!data) return;
    setSubscriber(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <div className="row my-3 justify-content-center">
        {subscriber && (
          <div className="col-8">
            <h2>{subscriber.name}</h2>

            <div className="form-floating mb-3">
              <input
                className="form-control form-control-sm"
                id="totalEquipments"
                defaultValue={subscriber.totalEquipments || 0}
                type="text"
                placeholder="Nombre"
                name="totalEquipments"
                required
              />
              <label htmlFor="totalEquipments">Total de Equipos</label>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleUpdateSubscriber}
            >
              Actualizar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
