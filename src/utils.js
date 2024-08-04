import { API_URL } from "./constants";
import { jwtDecode } from "jwt-decode";
import { SwalError, SwalSuccess, SwalWaiting } from "./utils/alerts";
import { getFromApi, patchToApi, postToApi, putToApi } from "./utils/api";
import { getJWT } from "./utils/tools";

export const getInfoAllPendingServiceWorks = async ({ user }) => {
  const serviceWorkInfo = {
    pc: 0,
    printers: 0,
    process: 0,
    myWorks: 0,
  };
  const url = `${API_URL}/api/orders/pendings-all`;

  const data = await getFromApi(url);
  if (!data) return;
  for (const serviceWork of data.payload) {
    if (serviceWork.estado === 21 && serviceWork.codiart === ".PC")
      serviceWorkInfo.pc++;
    if (serviceWork.estado === 21 && serviceWork.codiart === ".IMP")
      serviceWorkInfo.printers++;
    if (
      serviceWork.estado === 22 &&
      (serviceWork.codiart === ".PC" || serviceWork.codiart === ".IMP")
    )
      serviceWorkInfo.process++;
    if (
      serviceWork.estado === 22 &&
      serviceWork.tecnico === user.code_technical
    )
      serviceWorkInfo.myWorks++;
  }

  return serviceWorkInfo;
};

export const takeServiceWork = async ({ nrocompro, codeTechnical }) =>
  await putToApi(`${API_URL}/api/orders/take`, {
    nrocompro: `${nrocompro}`,
    code_technical: `${codeTechnical}`,
  });

export const getOrder = async ({ id }) => {
  const path = `${API_URL}/api/orders/${id}`;
  const data = await getFromApi(path);
  if (!data) return;

  return data.payload;
};

export const searchProduct = async ({ input, searchBy = "description" }) => {
  const response = await getFromApi(
    `${API_URL}/api/products/search-by?${searchBy}=${input}`
  );
  if (!response) return;

  return response.payload;
};

export const updateProductsInSeriveWork = async (order) => {
  SwalWaiting("Actualizando orden y enviando email");

  const response = await putToApi(`${API_URL}/api/orders/products`, order);
};

export const serviceWorkPutOut = async (nrocompro, notification) =>
  await putToApi(`${API_URL}/api/orders/out/${nrocompro}`, { notification });

export const serviceWorkPutFree = async (order, user) => {
  const orderToFree = {
    nrocompro: order.nrocompro,
    code_technical: user.code_technical,
  };

  return await putToApi(`${API_URL}/api/orders/free`, orderToFree);
};

export const getServiceWorks = async (from, to) => {
  const response = await getFromApi(`${API_URL}/api/orders/all/${from}/${to}`);
  if (!response) return;
  return response.payload;
};

export const getUser = () => {
  const jwt = getJWT();
  if (!jwt) return null;
  const { user } = jwtDecode(jwt);
  return user;
};

export const getCustomers = async (description) => {
  const response = await getFromApi(`${API_URL}/api/customers/${description}`);
  if (!response) return;
  return response.payload;
};

export const createPdfServiceWork = async ({ nrocompro, customer = false }) => {
  const response = await postToApi(`${API_URL}/api/orders/pdf`, {
    nrocompro,
    customer,
  });
  return response.payload;
};

export const createServiceWork = async (serviceWork) => {
  const response = await postToApi(`${API_URL}/api/orders`, {
    order: { ...serviceWork },
  });
  if (response?.status === "success") {
    return response.payload;
  }
  SwalError("Error al crear orden, actualice la pagina e intente nuevamente.");
};

export const updateServiceWork = async ({ id, updatedServiceWork }) => {
  const response = await patchToApi(`${API_URL}/api/orders/${id}`, {
    order: { ...updatedServiceWork },
  });
  if (response?.status === "success") {
    return response.payload;
  }
  SwalError(
    "Error al actualizar orden, actualice la pagina e intente nuevamente."
  );
};

export const sendCustomerPdf = async ({ nrocompro }) => {
  const path = `${API_URL}/api/orders/send/customer-pdf`;
  const response = await postToApi(path, { nrocompro });
  if (response.status === "success") {
    SwalSuccess(response.message);
  }
  if (response.status === "error") {
    SwalError(response.message);
  }
};
