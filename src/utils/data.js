import { API_URL } from "../constants";
import { patchToApi } from "../utils";

export const saveServiceWork = async ({ nrocompro, order }) => {
  const path = `${API_URL}/api/orders/${nrocompro}`;
  const response = await patchToApi(path, { order });
  if (!response) return;
  return response;
};
