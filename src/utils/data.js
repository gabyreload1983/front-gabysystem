import { API_URL } from "../constants";
import { putToApi } from "../utils";

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
