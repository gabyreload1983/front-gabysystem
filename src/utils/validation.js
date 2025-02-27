import { API_URL } from "../constants";
import { SwalError } from "./alerts";
import { getFromApi } from "./api";
import { destroyJwt } from "./tools";

export const validateResponse = async (response) => {
  if (response.status === 500) {
    await SwalError(
      "Error en el Servidor. Ponerse en contacto con el administrador."
    );
    return false;
  }

  if (response.status === 401) {
    const json = await response.json();
    await SwalError(json?.message || "Not authenticated!!!");
    return false;
  }

  if (response.status === 403) {
    const json = await response.json();
    if (json.message === "jwt-expired") {
      destroyJwt();
    }
    await SwalError(json?.message || "Unauthorized!!!");
    return false;
  }

  if (response.status === 400) {
    const json = await response.json();

    await SwalError(json?.message || "Algo esta mal con tu consulta!!!");
    return false;
  }

  if (response.status === 404) {
    const json = await response.json();

    await SwalError(json?.message || "Consulta no encontrada!!!");
    return false;
  }

  return true;
};

export const validateUserRole = (user, ...roles) => roles.includes(user?.role);

export const validateCreateServiceWork = (user) =>
  user.role === "premium" || user.role === "seller";

export const validateFreeServiceWork = (user, order) => {
  return (
    (user.role === "premium" &&
      order.estado !== 21 &&
      order.ubicacion !== 22) ||
    (user.role === "technical" &&
      order.estado === 22 &&
      order.tecnico === user?.code_technical)
  );
};

export const validateEditServiceWork = (user, order) => {
  return (
    (user.role === "technical" || user.role === "premium") &&
    order.estado === 22 &&
    order.tecnico === user.code_technical
  );
};

export const validateAddReplacement = (user, order) => {
  return (
    (user.role === "technical" || user.role === "premium") &&
    order.estado === 22 &&
    order.tecnico === user.code_technical
  );
};

export const validateTakeServiceWork = (user, order) => {
  return (
    (user.role === "technical" || user.role === "premium") &&
    order.estado === 21
  );
};

export const validateAddingProducts = (user, order) => {
  return user.role === "premium" && order.estado === 22;
};

export const validateServiceWorkOut = (user, order) => {
  return (
    (user.role === "premium" || user.role === "seller") &&
    order.estado === 23 &&
    order.ubicacion === 21
  );
};

export const validateSendPdf = (user) =>
  user.role === "premium" || user.role === "seller";

export const validateSerieMatchProduct = async (product, serie) => {
  const response = await getFromApi(`${API_URL}/api/products/serie/${serie}`);
  if (!response) return;

  if (response?.payload) {
    const productFind = response.payload;

    if (product.codigo !== productFind.code) {
      await SwalError(
        `El serie pertenece al producto 
        ${productFind.code} - ${productFind.description}`
      );
      return false;
    }
  }
  return true;
};

export const UUIDExists = (subscriber, newEquipment) => {
  const index = subscriber.equipments.findIndex(
    (equipment) =>
      equipment.uuid.toUpperCase() === newEquipment.uuid.toUpperCase()
  );

  return index === -1 ? false : true;
};

export const isValidUUID = (uuid) => {
  const uuidRegex =
    /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
  return uuidRegex.test(uuid);
};
