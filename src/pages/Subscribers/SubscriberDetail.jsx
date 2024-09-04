import { NavLink, useParams } from "react-router-dom";
import { getSubscriber } from "../../utils/data";
import { useEffect, useState } from "react";
import SubscriberEquipmentCard from "../../components/Subscriber/SubscriberEquipmentCard";
import {
  filterEquipmentType,
  getQuantityOfEquipmentType,
} from "../../utils/tools";

export default function SubscriberDetail() {
  const { id } = useParams();
  const [subscriber, setSubscriber] = useState(null);
  const [equipments, setEquipments] = useState([]);

  const getData = async () => {
    const data = await getSubscriber({ code: id });
    if (!data) return;
    setSubscriber(data);
  };

  const handleFilterEquipmentType = (type) => {
    const filterEquipments = filterEquipmentType(subscriber, type);
    setEquipments(filterEquipments);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      {subscriber && (
        <div className="row bg-dark text-white mt-2 p-3">
          <div className="col-12">
            <h2 className="text-center">
              {subscriber.code} - {subscriber.name}
              <NavLink
                to={`/subscribers/edit/${subscriber.code}`}
                className="btn btn-info btn-sm ms-2"
              >
                EDITAR
              </NavLink>
            </h2>
          </div>
          <div className="col-12">
            <h3>TOTAL DE EQUIPOS: {subscriber.equipments.length}</h3>
          </div>
          <div className="col-12">
            <div class="btn-group mb-3" role="group">
              <button
                type="button"
                class="btn btn-outline-primary"
                onClick={() => handleFilterEquipmentType("SERVER")}
              >
                SERVIDORES
                <span className="pill bg-primary ms-1 p-1 rounded text-white">
                  {getQuantityOfEquipmentType(subscriber, "SERVER")}
                </span>
              </button>
              <button
                type="button"
                class="btn btn-outline-primary"
                onClick={() => handleFilterEquipmentType("PC")}
              >
                PC ESCRITORIO
                <span className="pill bg-primary ms-1 p-1 rounded text-white">
                  {getQuantityOfEquipmentType(subscriber, "PC")}
                </span>
              </button>
              <button
                type="button"
                class="btn btn-outline-primary"
                onClick={() => handleFilterEquipmentType("NOTEBOOK")}
              >
                NOTEBOOKS
                <span className="pill bg-primary ms-1 p-1 rounded text-white">
                  {getQuantityOfEquipmentType(subscriber, "NOTEBOOK")}
                </span>
              </button>
              <button
                type="button"
                class="btn btn-outline-primary"
                onClick={() => handleFilterEquipmentType("PRINTER")}
              >
                IMPRESORAS
                <span className="pill bg-primary ms-1 p-1 rounded text-white">
                  {getQuantityOfEquipmentType(subscriber, "PRINTER")}
                </span>
              </button>
            </div>
            {equipments.length > 0 &&
              equipments.map((equipment) => (
                <SubscriberEquipmentCard
                  key={equipment.mac}
                  equipment={equipment}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
