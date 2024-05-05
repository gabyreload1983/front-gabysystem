import { NavLink, useParams } from "react-router-dom";
import {
  getFromApi,
  getOrderDiagnosis,
  getOrderState,
  getOrderTier,
  getOrderTierBackground,
  getOrderUbication,
} from "../../../utils";
import { useEffect, useState } from "react";
import ServiceWorkProducts from "./ServiceWorkProducts";

export default function ServiceWorkDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const getOrder = async () => {
    const path = `http://${import.meta.env.VITE_URL_HOST}/api/orders/${id}`;
    const data = await getFromApi(path);
    setOrder(data.payload);
  };

  useEffect(() => {
    getOrder();
  }, [id]);

  console.log(order);

  return (
    <>
      {order && (
        <div className="row justify-content-center px-3 text-white mt-3">
          <div className="col-12 col-lg-8 border text-center rounded p-2">
            <p
              className={`${getOrderTierBackground(
                order.prioridad
              )} m-0 rounded px-2 py-1 text-center text-xs text-gray-950`}
            >
              Tier {getOrderTier(order.prioridad)}
            </p>
            <strong className="fs-3">{order.nrocompro}</strong>
            <p className="fs-3 fw-semibold m-0">
              {order.codigo} - {order.nombre}
            </p>
            <div className="d-flex justify-content-center gap-3">
              <p>Fecha: {order.ingresado.slice(0, 10)}</p>
              <p className="mb-2">Telefono: {order.telefono}</p>
            </div>
            <div className="row text-center gap-3 p-0 m-0 mb-3">
              <div className="col-12  m-0 px-0 py-1 col-lg rounded bg-success">
                <span className="m-0">
                  Estado {getOrderState(order.estado)}
                </span>
              </div>
              <div className="col-12  m-0 px-0 py-1 col-lg rounded bg-success">
                <span className="m-0">
                  Diagnostico {getOrderDiagnosis(order.diag)}
                </span>
              </div>
              <div className="col-12  m-0 px-0 py-1 col-lg rounded bg-success">
                <span className="m-0">
                  Ubicacion {getOrderUbication(order.ubicacion)}
                </span>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-between rounded bg-light py-1 text-black">
              <p className="m-0 fs-5">{order.descart}</p>
              <p className="m-0">{order.accesorios}</p>
            </div>

            <p className="py-3 m-0">
              <strong>Falla: </strong>
              {order.falla}
            </p>
            <div className="col-12 p-2">
              <ServiceWorkProducts order={order} />
            </div>
            <div className="col-12 p-2 d-flex gap-2">
              <NavLink
                to={`/orders/detail/${order.nrocompro}`}
                className="w-100 btn btn-info"
              >
                Editar
              </NavLink>
              <NavLink
                to={`/orders/detail/${order.nrocompro}`}
                className="w-100 btn btn-info"
              >
                Agregar Articulos
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
