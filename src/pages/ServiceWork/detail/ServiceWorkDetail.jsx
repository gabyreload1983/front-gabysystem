import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ServiceWorkProducts from "./ServiceWorkProducts";
import { UserContext } from "../../../context/userContext";
import TakeServiceWorkButton from "../../../components/ServiceWork/TakeServiceWorkButton";
import ServiceWorkOut from "./ServiceWorkOut";
import Loading from "../../../components/Loading";
import ServiceWorkFree from "./ServiceWorkFree";
import ButtonPdf from "../../../components/ServiceWork/ButtonPdf";
import SendPdf from "../../../components/ServiceWork/SendPdf";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import {
  validateAddingProducts,
  validateEditServiceWork,
  validateFreeServiceWork,
  validateSendPdf,
  validateServiceWorkOut,
  validateTakeServiceWork,
  validateUserRole,
} from "../../../utils/validation";
import TechnicalEdit from "../../../components/ServiceWork/TechnicalEdit";
import {
  closeServiceWork,
  getServiceWork,
  saveServiceWork,
  serviceWorkPutFree,
  serviceWorkPutOut,
} from "../../../utils/data";
import Diagnosis from "../../../components/ServiceWork/Diagnosis";
import Fail from "../../../components/ServiceWork/Fail";
import SendWhatsapp from "../../../components/SendWhatsapp";
import { SwalQuestion, SwalToast } from "../../../utils/alerts";
import {
  getOrderDiagnosis,
  getOrderDiagnosisBackground,
  getOrderState,
  getOrderStateBackground,
  getOrderTier,
  getOrderTierBackground,
  getOrderUbication,
  getOrderUbicationBackground,
} from "../../../utils/tools";

export default function ServiceWorkDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    const data = await getServiceWork({ nrocompro: id });
    setOrder(data);
  };

  const serviceWorkOut = async (nrocompro) => {
    const confirm = await SwalQuestion(
      `Queres dar salida a la orden ${order.nrocompro}?`
    );
    if (!confirm) return;

    const notification = await SwalQuestion(`Notificar al cliente???`);

    setLoading(true);

    const response = await serviceWorkPutOut(nrocompro, notification);

    setLoading(false);
    if (response.status === "success") {
      SwalToast("Salida de orden exitosa!");
      getData();
    }
  };

  const serviceWorkFree = async (nrocompro) => {
    const confirm = await SwalQuestion(
      `Queres liberar la orden ${order.nrocompro}?`
    );
    if (!confirm) return;

    setLoading(true);

    const response = await serviceWorkPutFree(order, user);

    setLoading(false);
    if (response.status === "success") {
      SwalToast("Se libero orden!");
      navigate(0); //TODO refresh all data without reload the page
    }
  };

  const handleSaveServiceWork = async (diagnosis) => {
    const response = await saveServiceWork({
      nrocompro: order.nrocompro,
      diagnosis,
    });

    if (!response) return;
    SwalToast(`Orden ${order.nrocompro} actualizada!`, 1000);
  };

  const handleCloseServiceWork = async ({
    diagnosisStatus,
    notification,
    cost,
  }) => {
    setLoading(true);
    const response = await closeServiceWork({
      diagnosisStatus,
      notification,
      cost,
      order,
      user,
    });
    setLoading(false);
    if (!response) return;
    if (response.status === "success") {
      SwalToast(`Se cerro orden ${order.nrocompro}!`, 1000);
      getData();
    }
  };

  const handleOnChange = (diagnosis) => {
    setOrder((prev) => ({ ...prev, diagnostico: diagnosis }));
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
            <div className="d-flex justify-content-center align-items-center gap-2">
              <strong className="fs-3">{order.nrocompro}</strong>
              {validateUserRole(user, "premium", "seller") && (
                <NavLink to={`/servicework/edit/${order.nrocompro}`}>
                  <PencilSquareIcon className="icon" />
                </NavLink>
              )}
            </div>
            <p className="fs-3 fw-semibold m-0">
              {order.codigo} - {order.nombre}
            </p>
            <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
              <p className="m-0">Fecha: {order.ingresado.slice(0, 10)}</p>
              <p className="m-0">Telefono: {order.telefono}</p>
              <SendWhatsapp celphone={order.telefono} />
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

            <Fail fail={order.falla} />
            {validateEditServiceWork(user, order) ? (
              <TechnicalEdit
                serviceWork={order}
                handleSaveServiceWork={handleSaveServiceWork}
                handleCloseServiceWork={handleCloseServiceWork}
                handleOnChange={handleOnChange}
              />
            ) : (
              <Diagnosis diagnosis={order.diagnostico} />
            )}
            <div className="col-12 p-2">
              <ServiceWorkProducts order={order} />
            </div>
            <div className="col-12 p-2 d-flex justify-content-end gap-2">
              <ButtonPdf nrocompro={order.nrocompro} />
              <ButtonPdf nrocompro={order.nrocompro} customer={true} />
              {validateSendPdf(user) && <SendPdf nrocompro={order.nrocompro} />}
            </div>
            <div className="col-12 p-2 d-flex gap-2">
              {validateTakeServiceWork(user, order) && (
                <TakeServiceWorkButton
                  nrocompro={order.nrocompro}
                  codeTechnical={user.code_technical}
                />
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
              {validateFreeServiceWork(user, order) && (
                <ServiceWorkFree
                  order={order}
                  serviceWorkFree={serviceWorkFree}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
