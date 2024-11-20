import { jwtDecode } from "jwt-decode";
import { API_URL } from "../constants";
import {
  deleteToApi,
  getFromApi,
  patchToApi,
  postToApi,
  putToApi,
} from "./api";
import { getJWT } from "./tools";
import { SwalError, SwalSuccess } from "./alerts";

// SERVICEWORKS
export const getServiceWork = async ({ nrocompro }) => {
  const path = `${API_URL}/api/orders/${nrocompro}`;
  const data = await getFromApi(path);

  if (!data) return;
  return data.payload;
};

export const getServiceWorks = async (from, to) => {
  const response = await getFromApi(`${API_URL}/api/orders/all/${from}/${to}`);
  if (!response) return;
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

export const saveServiceWork = async ({ nrocompro, diagnosis }) => {
  const response = await putToApi(`${API_URL}/api/orders/update`, {
    nrocompro,
    diagnosis,
  });

  if (!response) return;
  return response;
};

export const closeServiceWork = async ({
  diagnosisStatus,
  notification,
  cost,
  order,
  user,
}) => {
  const orderToClose = {
    nrocompro: order.nrocompro,
    diagnostico: order.diagnostico,
    costo: cost,
    diag: diagnosisStatus,
    code_technical: user.code_technical,
    notification,
  };

  const response = await putToApi(`${API_URL}/api/orders/close`, {
    ...orderToClose,
  });
  if (!response) return;
  return response;
};

export const takeServiceWork = async ({
  nrocompro,
  codeTechnical,
  notification,
}) =>
  await putToApi(`${API_URL}/api/orders/take`, {
    nrocompro: `${nrocompro}`,
    code_technical: `${codeTechnical}`,
    notification,
  });

export const updateServideWorkCustomer = async ({ nrocompro, customerId }) => {
  const response = await putToApi(`${API_URL}/api/orders/update-customer`, {
    nrocompro,
    customerId,
  });
  if (!response) return;
  return response.payload;
};

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

export const updateProductsInSeriveWork = async (order) =>
  await putToApi(`${API_URL}/api/orders/products`, order);

export const serviceWorkPutOut = async (nrocompro, notification) =>
  await putToApi(`${API_URL}/api/orders/out/${nrocompro}`, { notification });

export const serviceWorkPutFree = async (order, user) => {
  const orderToFree = {
    nrocompro: order.nrocompro,
    code_technical: user.code_technical,
  };

  return await putToApi(`${API_URL}/api/orders/free`, orderToFree);
};

export const createPdfServiceWork = async ({ nrocompro, customer = false }) => {
  const response = await postToApi(`${API_URL}/api/orders/pdf`, {
    nrocompro,
    customer,
  });
  return response.payload;
};

export const sendServiceWorkPdf = async ({ nrocompro }) => {
  const path = `${API_URL}/api/orders/send/customer-pdf`;
  return await postToApi(path, { nrocompro });
};

// CUSTOMERS
export const getCustomer = async ({ code }) => {
  const response = await getFromApi(`${API_URL}/api/customers/code/${code}`);
  if (!response) return;
  return response.payload;
};

export const getCustomers = async (description) => {
  const response = await getFromApi(`${API_URL}/api/customers/${description}`);
  if (!response) return;
  return response.payload;
};

export const getCustomerServiceWorks = async ({ code }) => {
  const response = await getFromApi(`${API_URL}/api/orders/customer/${code}`);
  if (!response) return;
  return response.payload;
};

export const getCustomersByDescription = async (description) => {
  const response = await getFromApi(`${API_URL}/api/customers/${description}`);
  if (!response) return;
  return response.payload;
};

export const getSubscribersFromUrbano = async () => {
  const response = await getFromApi(`${API_URL}/api/customers/subscribers`);
  if (!response) return;
  return response.payload;
};

export const getSubscribers = async () => {
  const response = await getFromApi(`${API_URL}/api/subscribers`);
  if (!response) return;
  return response.payload;
};

export const getSubscriber = async ({ code }) => {
  const response = await getFromApi(`${API_URL}/api/subscribers/${code}`);
  if (!response) return;
  return response.payload;
};

export const addSubscriber = async (code) => {
  const response = await postToApi(`${API_URL}/api/subscribers`, {
    code,
  });
  if (!response) return;
  return response;
};

export const cancelSubscription = async (code) => {
  const response = await putToApi(
    `${API_URL}/api/subscribers/remove-subscription`,
    {
      code,
    }
  );
  if (!response) return;
  return response;
};

export const updateSubscriber = async (code, subscriberUpdate) => {
  const response = await putToApi(`${API_URL}/api/subscribers/${code}`, {
    subscriberUpdate,
  });
  if (!response) return;
  return response;
};

export const addEquipment = async (code, newEquipment) => {
  const response = await putToApi(`${API_URL}/api/subscribers/add-equipment`, {
    code,
    newEquipment,
  });
  if (!response) return;
  return response;
};

export const removeEquipment = async ({ equipmentToRemove }) => {
  const response = await putToApi(
    `${API_URL}/api/subscribers/remove-equipment`,
    {
      equipmentToRemove,
    }
  );
  if (!response) return;
  return response;
};

export const editEquipment = async (updatedEquipment) => {
  const response = await putToApi(
    `${API_URL}/api/subscribers/update-equipment`,
    {
      updatedEquipment,
    }
  );
  if (!response) return;

  return response;
};

// PRODUCTS
export const searchProduct = async ({ input, searchBy = "description" }) => {
  const response = await getFromApi(
    `${API_URL}/api/products/search-by?${searchBy}=${input}`
  );
  if (!response) return;

  return response.payload;
};

export const searchSerie = async ({ serie }) => {
  const response = await getFromApi(`${API_URL}/api/products/serie/${serie}`);
  if (!response) return;

  return response.payload;
};

export const getProductRequest = async () => {
  const response = await getFromApi(`${API_URL}/api/products/order-list`);
  if (!response) return;

  return response.payload;
};

export const cleanProductRequestList = async () => {
  const response = await deleteToApi(
    `${API_URL}/api/products/clear-order-list`
  );
  if (!response) return;

  return response;
};

export const removeProductRequest = async (code) => {
  const response = await deleteToApi(
    `${API_URL}/api/products/order-list/${code}`
  );
  if (!response) return;

  return response;
};

export const boughtProductRequest = async (productCode) => {
  const response = await postToApi(`${API_URL}/api/products/request/bought`, {
    productCode,
  });
  if (!response) return;

  return response;
};

export const getRmaProducts = async () => {
  const response = await searchProduct({ input: "ssd" });
  if (!response) return;

  return response;
};

export const requestProduct = async (
  product,
  quantity,
  customerCode,
  observation
) => {
  const response = await postToApi(`${API_URL}/api/products/request`, {
    productCode: product.codigo,
    quantity,
    customerCode,
    observation,
  });
  if (!response) return;
  return response;
};

// REPLACEMENTS

export const getReplacements = async () => {
  const response = await getFromApi(`${API_URL}/api/replacements`);
  if (!response) return;

  return response.payload;
};

export const AddNewReplacement = async (replacement) => {
  const response = await postToApi(`${API_URL}/api/replacements`, {
    replacement,
  });
  if (response?.status === "success") {
    return response.payload;
  }
};

// USERS
export const getUser = () => {
  const jwt = getJWT();
  if (!jwt) return null;
  const { user } = jwtDecode(jwt);
  return user;
};
