import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ServiceWorkProducts from "./ServiceWorkProducts";
import { UserContext } from "../../../context/userContext";
import TakeServiceWorkButton from "../../../components/ServiceWork/TakeServiceWorkButton";
import ServiceWorkOut from "./ServiceWorkOut";
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
  addNewReplacement,
  closeServiceWork,
  getReplacementsByServiceWork,
  getServiceWork,
  saveServiceWork,
  sendServiceWorkPdf,
  serviceWorkPutFree,
  serviceWorkPutOut,
} from "../../../utils/data";
import Diagnosis from "../../../components/ServiceWork/Diagnosis";
import Fail from "../../../components/ServiceWork/Fail";
import SendWhatsapp from "../../../components/SendWhatsapp";
import { SwalQuestion, SwalSuccess, SwalToast } from "../../../utils/alerts";
import {
  formatDate,
  getinvoicesBalanceBackground,
  getOrderDiagnosis,
  getOrderDiagnosisBackground,
  getOrderState,
  getOrderStateBackground,
  getOrderTier,
  getOrderTierBackground,
  getOrderUbication,
  getOrderUbicationBackground,
} from "../../../utils/tools";
import ServiceWorkReplacements from "./ServiceWorkReplacements";
import { ROLES } from "../../../constants";
import LoadingOverlay from "../../../components/LoadingOverlay";

export default function ServiceWorkDetail() {
  const { id } = useParams();
  const [serviceWork, setServiceWork] = useState(null);
  const [replacements, setReplacements] = useState(null);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    const dataServiceWork = await getServiceWork({ nrocompro: id });
    setServiceWork(dataServiceWork);
    const dataReplacements = await getReplacementsByServiceWork(id);
    setReplacements(dataReplacements);
  };

  const serviceWorkOut = async (nrocompro) => {
    const confirm = await SwalQuestion(
      `Queres dar salida a la orden ${serviceWork.nrocompro}?`
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
      `Queres liberar la orden ${serviceWork.nrocompro}?`
    );
    if (!confirm) return;

    setLoading(true);

    const response = await serviceWorkPutFree(serviceWork, user);

    setLoading(false);
    if (response.status === "success") {
      SwalToast("Se libero orden!");
      navigate(0); //TODO refresh all data without reload the page
    }
  };

  const handleSaveServiceWork = async (diagnosis) => {
    const response = await saveServiceWork({
      nrocompro: serviceWork.nrocompro,
      diagnosis,
    });

    if (!response) return;
    SwalToast(`Orden ${serviceWork.nrocompro} actualizada!`, 1000);
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
      order: serviceWork,
      user,
    });
    setLoading(false);
    if (!response) return;
    if (response.status === "success") {
      SwalToast(`Se cerro orden ${serviceWork.nrocompro}!`, 1000);
      getData();
    }
  };

  const handleOnChange = (diagnosis) => {
    setServiceWork((prev) => ({ ...prev, diagnostico: diagnosis }));
  };

  const handleSendPdf = async () => {
    const response = await sendServiceWorkPdf({
      nrocompro: serviceWork.nrocompro,
    });
    if (!response) return;
    SwalSuccess("Se envio orden!");
    getData();
  };

  const handleAddReplacement = async (description) => {
    const replacement = {
      description,
      orderNumber: id,
      requests: user.code_technical,
    };
    const response = await addNewReplacement(replacement);
    if (!response) return;
    getData();
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      {serviceWork && (
        <div className="row justify-content-center px-3 text-white mt-3">
          <div className="col-12 border text-center rounded p-2 bg-dark">
            {<LoadingOverlay loading={loading}/>}
            <p
              className={`${getOrderTierBackground(
                serviceWork.prioridad
              )} m-0 rounded px-2 py-1 text-center text-xs text-gray-950`}
            >
              Tier {getOrderTier(serviceWork.prioridad)}
            </p>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <strong className="fs-3">{serviceWork.nrocompro}</strong>
              {validateUserRole(user, ROLES.PREMIUM, ROLES.SELLER) && (
                <NavLink to={`/servicework/edit/${serviceWork.nrocompro}`}>
                  <PencilSquareIcon className="icon" />
                </NavLink>
              )}
            </div>
            <p className="fs-3 fw-semibold m-0">
              {serviceWork.codigo} - {serviceWork.nombre}
            </p>
            <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
              <p className="m-0">Fecha: {serviceWork.ingresado.slice(0, 10)}</p>
              <p className="m-0">Telefono: {serviceWork.telefono}</p>
              <SendWhatsapp celphone={serviceWork.telefono} />
            </div>
            <div className="d-flex justify-content-center gap-3 mb-3">
              <p className="m-0 bg-secondary px-3 rounded">
                Vendedor: {serviceWork.operador}
              </p>
              <p className="m-0 bg-secondary px-3 rounded">
                Tecnico: {serviceWork.tecnico}
              </p>
            </div>
            <div className="row gap-3 p-0 m-0 mb-3">
              <div
                className={`${getOrderStateBackground(
                  serviceWork.estado
                )} col-12 col-lg rounded d-flex justify-content-center align-items-center`}
              >
                <span className="m-0">
                  Estado {getOrderState(serviceWork.estado)}
                </span>
              </div>
              <div
                className={`${getOrderDiagnosisBackground(
                  serviceWork.diag
                )} col-12 col-lg rounded d-flex justify-content-center align-items-center`}
              >
                <span className="m-0">
                  Diagnostico {getOrderDiagnosis(serviceWork.diag)}
                </span>
              </div>
              <div
                className={`${getOrderUbicationBackground(
                  serviceWork.ubicacion
                )} col-12 col-lg rounded d-flex justify-content-center align-items-center`}
              >
                <span className="m-0">
                  {getOrderUbication(serviceWork.ubicacion)}
                  {getOrderUbication(serviceWork.ubicacion) === "ENTREGADO" && (
                    <p className="m-0">
                      {formatDate(serviceWork.egresado)} -{" "}
                      {serviceWork.opcional}
                    </p>
                  )}
                </span>
              </div>
              {serviceWork.invoice && (
                <div
                  className={`${getinvoicesBalanceBackground(
                    serviceWork.balance
                  )} col-12 col-lg rounded d-flex justify-content-center align-items-center`}
                >
                  <span className="m-0">{serviceWork.invoice}</span>
                </div>
              )}
            </div>
            <div className="d-flex flex-column align-items-center justify-content-between rounded bg-light py-1 text-black">
              <p className="m-0 fs-5">{serviceWork.descart}</p>
              <p className="m-0">{serviceWork.accesorios}</p>
            </div>

            <Fail fail={serviceWork.falla} />
            {validateEditServiceWork(user, serviceWork) ? (
              <TechnicalEdit
                serviceWork={serviceWork}
                handleSaveServiceWork={handleSaveServiceWork}
                handleCloseServiceWork={handleCloseServiceWork}
                handleOnChange={handleOnChange}
              />
            ) : (
              <Diagnosis diagnosis={serviceWork.diagnostico} />
            )}
            <div className="col-12 p-2 border rounded mb-2">
              <ServiceWorkProducts order={serviceWork} />
            </div>

            <div className="col-12 p-2 border rounded mb-2">
              <ServiceWorkReplacements
                replacements={replacements}
                onHandleAddReplacement={handleAddReplacement}
                serviceWork={serviceWork}
              />
            </div>

            <div className="col-12 p-2 d-flex justify-content-end gap-2">
              <ButtonPdf nrocompro={serviceWork.nrocompro} />
              <ButtonPdf nrocompro={serviceWork.nrocompro} customer={true} />
              {validateSendPdf(user) && (
                <SendPdf
                  serviceWork={serviceWork}
                  handleSendPdf={handleSendPdf}
                />
              )}
            </div>
            <div className="col-12 p-2 d-flex gap-2">
              {validateTakeServiceWork(user, serviceWork) && (
                <TakeServiceWorkButton
                  nrocompro={serviceWork.nrocompro}
                  codeTechnical={user.code_technical}
                />
              )}
              {validateAddingProducts(user, serviceWork) && (
                <NavLink
                  to={`/servicework/edit/products/${serviceWork.nrocompro}`}
                  className="w-100 btn btn-info"
                >
                  AGREGAR ARTICULOS
                </NavLink>
              )}
              {validateServiceWorkOut(user, serviceWork) && (
                <ServiceWorkOut
                  order={serviceWork}
                  serviceWorkOut={serviceWorkOut}
                />
              )}
              {validateFreeServiceWork(user, serviceWork) && (
                <ServiceWorkFree
                  order={serviceWork}
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
