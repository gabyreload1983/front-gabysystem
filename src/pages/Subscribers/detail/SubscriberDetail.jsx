import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  cancelSubscription,
  getSubscriber,
  removeEquipment,
} from "../../../utils/data";
import { useContext, useEffect, useState } from "react";
import SubscriberEquipmentCard from "../../../components/Subscriber/SubscriberEquipmentCard";
import {
  filterEquipmentType,
  getQuantityOfEquipmentType,
} from "../../../utils/tools";
import { SwalActionConfirmWithText, SwalToast } from "../../../utils/alerts";
import { validateUserRole } from "../../../utils/validation";
import { UserContext } from "../../../context/userContext";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { ROLES } from "../../../constants";

export default function SubscriberDetail() {
  const { id } = useParams();
  const [subscriber, setSubscriber] = useState(null);
  const [equipments, setEquipments] = useState([]);
  const [active, setActive] = useState("ALL");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const getData = async () => {
    const data = await getSubscriber({ code: id });
    if (!data || !data.status) return;
    setSubscriber(data);
    setEquipments(data.equipments);
  };

  const handleFilterEquipmentType = (type) => {
    const filterEquipments = filterEquipmentType(subscriber, type);
    setEquipments(filterEquipments);
    setActive(type);
  };

  const handleCancelSubscription = async (subscriber) => {
    const confirm = await SwalActionConfirmWithText(
      subscriber.code,
      "Esta seguro de cancelar el abono???",
      "Ingrese el codigo de cliente para confirmar"
    );

    if (!confirm) return;

    const response = await cancelSubscription(subscriber.code);
    if (response?.status === "success") {
      await SwalToast("Se cancelo abondo!", 500);
      navigate("/subscribers/list");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="container bg-dark text-white mt-2 p-3">
      {subscriber && (
        <>
          <h2 className="text-center">
            {subscriber.code} - {subscriber.name}
          </h2>
          <article className="d-flex flex-column border p-3 rounded col-12 col-md-6 mb-3">
            <h3>
              CONTRATO
              {validateUserRole(user, ROLES.PREMIUM) && (
                <NavLink
                  className="ms-2"
                  to={`/subscribers/edit/${subscriber.code}`}
                >
                  <PencilSquareIcon className="icon" />
                </NavLink>
              )}
            </h3>
            <p>EQUIPOS: {subscriber.totalEquipments}</p>
            <p>SERVIDORES: {subscriber.totalServers}</p>

            {validateUserRole(user, ROLES.PREMIUM) && (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleCancelSubscription(subscriber)}
              >
                CANCELAR ABONO
              </button>
            )}
          </article>

          <article className="border p-3 rounded col-12">
            <h4>RELEVAMIENTO</h4>
            {validateUserRole(user, ROLES.PREMIUM) && (
              <div className="mb-3">
                <NavLink
                  to={`/subscribers/edit/${subscriber.code}/add-equipment`}
                  className="btn btn-success btn-sm ms-2"
                >
                  AGREGAR EQUIPO
                </NavLink>
              </div>
            )}
            <div className="btn-group mb-3" role="group">
              <button
                type="button"
                className={`btn ${
                  active === "SERVER" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handleFilterEquipmentType("SERVER")}
              >
                SERVIDORES
                <span className="pill bg-primary ms-1 p-1 rounded text-white">
                  {getQuantityOfEquipmentType(subscriber, "SERVER")}
                </span>
              </button>
              <button
                type="button"
                className={`btn ${
                  active === "PC" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handleFilterEquipmentType("PC")}
              >
                PC ESCRITORIO
                <span className="pill bg-primary ms-1 p-1 rounded text-white">
                  {getQuantityOfEquipmentType(subscriber, "PC")}
                </span>
              </button>
              <button
                type="button"
                className={`btn ${
                  active === "NOTEBOOK" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handleFilterEquipmentType("NOTEBOOK")}
              >
                NOTEBOOKS
                <span className="pill bg-primary ms-1 p-1 rounded text-white">
                  {getQuantityOfEquipmentType(subscriber, "NOTEBOOK")}
                </span>
              </button>
              <button
                type="button"
                className={`btn ${
                  active === "PRINTER" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handleFilterEquipmentType("PRINTER")}
              >
                IMPRESORAS
                <span className="pill bg-primary ms-1 p-1 rounded text-white">
                  {getQuantityOfEquipmentType(subscriber, "PRINTER")}
                </span>
              </button>
              <button
                type="button"
                className={`btn ${
                  active === "ALL" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handleFilterEquipmentType("ALL")}
              >
                TODOS
                <span className="pill bg-primary ms-1 p-1 rounded text-white">
                  {subscriber.equipments.length}
                </span>
              </button>
            </div>

            {equipments.length > 0 &&
              equipments.map((equipment) => (
                <SubscriberEquipmentCard
                  key={equipment.uuid}
                  equipment={equipment}
                  subscriberCode={subscriber.code}
                />
              ))}
          </article>
        </>
      )}
    </section>
  );
}
