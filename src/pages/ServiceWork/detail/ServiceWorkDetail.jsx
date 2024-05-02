import { useParams } from "react-router-dom";
import {
  getFromApi,
  getOrderDiagnosis,
  getOrderState,
  getOrderTier,
  getOrderTierBackground,
  getOrderUbication,
} from "../../../utils";
import { useEffect, useState } from "react";

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

  return (
    <>
      {order && (
        <div className="container-fluid border text-center rounded p-2">
          <p
            className={`${getOrderTierBackground(
              order.prioridad
            )} mb-2 rounded px-2 py-1 text-center text-xs text-gray-950`}
          >
            Tier {getOrderTier(order.prioridad)}
          </p>
          <strong className="fs-1">{order.nrocompro}</strong>
          <p className="fw-semibold">
            {order.codigo} - {order.nombre}
          </p>
          <p>Fecha: {order.ingresado.slice(0, 10)}</p>
          <p className="mb-2">Telefono: {order.telefono}</p>
          <div className="mb-3 d-flex flex-column align-items-center justify-content-between rounded bg-gray-900 py-2">
            <p>{order.descart}</p>
            <p>{order.accesorios}</p>
          </div>
          <div className="row m-0 p-0 text-center">
            <div className="col-12 col-md-4 rounded bg-success py-2 px-0">
              <span className="m-0">Estado {getOrderState(order.estado)}</span>
            </div>
            <div className="col-12 col-md-4 rounded bg-success py-2 px-0">
              <span className="m-0">
                Diagnostico {getOrderDiagnosis(order.diag)}
              </span>
            </div>
            <div className="col-12 col-md-4 rounded bg-success py-2 px-0">
              <span className="m-0">
                Ubicacion {getOrderUbication(order.ubicacion)}
              </span>
            </div>
          </div>

          <p className="py-3">
            {" "}
            <strong>Falla: </strong>
            {order.falla}
          </p>
        </div>
      )}
    </>
  );
}
