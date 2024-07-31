import { API_URL } from "../constants";
import { getFromApi, putToApi } from "../utils";

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

export const getCustomer = async ({ code }) => {
  const response = await getFromApi(`${API_URL}/api/customers/code/${code}`);
  if (!response) return;
  return response.payload;
};

export const getCustomersByDescription = async (description) => {
  const response = await getFromApi(`${API_URL}/api/customers/${description}`);
  if (!response) return;
  return response.payload;
};

export const getCustomerServiceWorks = async ({ code }) => {
  const response = await getFromApi(`${API_URL}/api/orders/customer/${code}`);
  if (!response) return;
  return response.payload;
};

export const updateServideWorkCustomer = async ({ nrocompro, customerId }) => {
  const response = await putToApi(`${API_URL}/api/orders/update-customer`, {
    nrocompro,
    customerId,
  });
  if (!response) return;
  return response.payload;
};
