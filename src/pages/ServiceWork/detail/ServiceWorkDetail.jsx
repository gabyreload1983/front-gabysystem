import { NavLink, useParams } from "react-router-dom";
import {
  SwalToast,
  getOrder,
  getOrderDiagnosis,
  getOrderDiagnosisBackground,
  getOrderState,
  getOrderStateBackground,
  getOrderTier,
  getOrderTierBackground,
  getOrderUbication,
  getOrderUbicationBackground,
  serviceWorkPutOut,
  validateAddingProducts,
  validateEditServiceWork,
  validateServiceWorkOut,
  validateTakeServiceWork,
} from "../../../utils";
import { useContext, useEffect, useState } from "react";
import ServiceWorkProducts from "./ServiceWorkProducts";
import { UserContext } from "../../../context/userContext";
import TakeServiceWorkButton from "../../../components/ServiceWork/TakeServiceWorkButton";
import ServiceWorkOut from "./ServiceWorkOut";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import { API_URL } from "../../../constants";

export default function ServiceWorkDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const data = await getOrder({ id });
    setOrder(data);
  };

  const serviceWorkOut = async (nrocompro) => {
    const question = await Swal.fire({
      text: `Queres dar salida a la orden ${order.nrocompro}?`,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    });
    if (!question.isConfirmed) return;

    const notification = await Swal.fire({
      text: `Notificar al cliente???`,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    });

    setLoading(true);

    const response = await serviceWorkPutOut(
      nrocompro,
      notification.isConfirmed
    );

    setLoading(false);
    if (response.status === "success") {
      SwalToast("Salida de orden exitosa!");
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      {order && (
        <div className="row justify-content-center px-3 text-white mt-3">
          <div className="col-12 col-lg-8 border text-center rounded p-2 bg-dark">
            {loading && <Loading />}
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
            <div className="d-flex justify-content-center gap-3 mb-3">
              <p className="m-0 bg-secondary px-3 rounded">
                Vendedor: {order.operador}
              </p>
              <p className="m-0 bg-secondary px-3 rounded">
                Tecnico: {order.tecnico}
              </p>
            </div>
            <div className="row text-center gap-3 p-0 m-0 mb-3">
              <div
                className={`${getOrderStateBackground(
                  order.estado
                )} col-12  m-0 px-0 py-1 col-lg rounded`}
              >
                <span className="m-0">
                  Estado {getOrderState(order.estado)}
                </span>
              </div>
              <div
                className={`${getOrderDiagnosisBackground(
                  order.diag
                )} col-12  m-0 px-0 py-1 col-lg rounded`}
              >
                <span className="m-0">
                  Diagnostico {getOrderDiagnosis(order.diag)}
                </span>
              </div>
              <div
                className={`${getOrderUbicationBackground(
                  order.ubicacion
                )} col-12  m-0 px-0 py-1 col-lg rounded`}
              >
                <span className="m-0">
                  Ubicacion {getOrderUbication(order.ubicacion)}
                </span>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-between rounded bg-light py-1 text-black">
              <p className="m-0 fs-5">{order.descart}</p>
              <p className="m-0">{order.accesorios}</p>
            </div>

            <p className="py-3 m-0 text-start">
              <strong className="bg-danger p-1 rounded">Falla: </strong>
              <span className="ms-2">{order.falla}</span>
            </p>
            {order.diagnostico !== "" && (
              <p className="py-3 m-0 text-start">
                <strong className="bg-info p-1 rounded">Diagnostico: </strong>
                <span className="ms-2">{order.diagnostico}</span>
              </p>
            )}
            <div className="col-12 p-2">
              <ServiceWorkProducts order={order} />
            </div>
            <div className="col-12 p-2 d-flex justify-content-end">
              <NavLink
                to={`${API_URL}/pdfHistory/${order.nrocompro}.pdf`}
                className="btn btn-warning"
                target="_blank"
              >
                PDF
              </NavLink>
            </div>
            <div className="col-12 p-2 d-flex gap-2">
              {validateTakeServiceWork(user, order) && (
                <TakeServiceWorkButton
                  nrocompro={order.nrocompro}
                  codeTechnical={user.code_technical}
                />
              )}
              {validateEditServiceWork(user, order) && (
                <NavLink
                  to={`/orders/detail/${order.nrocompro}`}
                  className="w-100 btn btn-info"
                >
                  EDITAR
                </NavLink>
              )}
              {validateAddingProducts(user, order) && (
                <NavLink
                  to={`/servicework/edit/products/${order.nrocompro}`}
                  className="w-100 btn btn-info"
                >
                  AGREGAR ARTICULOS
                </NavLink>
              )}
              {validateServiceWorkOut(user, order) && (
                <ServiceWorkOut order={order} serviceWorkOut={serviceWorkOut} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
