import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSubscriber, updateSubscriber } from "../../../utils/data";
import { SwalToast } from "../../../utils/alerts";

export default function UpdateSubscriber() {
  const { id } = useParams();
  const [subscriber, setSubscriber] = useState(null);
  const navigate = useNavigate();

  const handleUpdateSubscriber = async () => {
    const totalEquipments = Number(
      document.getElementById("totalEquipments").value
    );
    const totalServers = Number(document.getElementById("totalServers").value);
    const subscriberUpdate = { ...subscriber, totalEquipments, totalServers };

    const response = await updateSubscriber(id, subscriberUpdate);
    if (response) {
      await SwalToast(`Se actualizo cantidad de equipos!`, 500);
      navigate(`/subscribers/detail/${id}`);
    }
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
    <>
      {subscriber && (
        <div className="col-12 col-md-6 bg-dark text-white p-3 rounded">
          <h2>{subscriber.name}</h2>

          <div className="form-floating mb-3">
            <input
              className="form-control form-control-sm"
              id="totalEquipments"
              defaultValue={subscriber.totalEquipments || 0}
              placeholder="Nombre"
              name="totalEquipments"
              required
              type="number"
              min={0}
              max={100}
            />
            <label htmlFor="totalEquipments">Total de Equipos</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control form-control-sm"
              id="totalServers"
              defaultValue={subscriber.totalServers || 0}
              placeholder="Nombre"
              name="totalServers"
              required
              type="number"
              min={0}
              max={100}
            />
            <label htmlFor="totalServers">Total de Servidores</label>
          </div>

          <button className="btn btn-primary" onClick={handleUpdateSubscriber}>
            Actualizar
          </button>
        </div>
      )}
    </>
  );
}
