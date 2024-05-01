import moment from "moment";
import Swal from "sweetalert2";

export const getFromApi = async (path) => {
  try {
    const response = await fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });
    if (validateResponse(response)) return await response.json();
  } catch (error) {
    return SwalError(error);
  }
};

export const putToApi = async (path, body) => {
  try {
    const response = await fetch(path, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });
    if (validateResponse(response)) return await response.json();
  } catch (error) {
    return SwalError(error);
  }
};

export const postToApi = async (path, body) => {
  try {
    const response = await fetch(path, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });
    if (validateResponse(response)) return await response.json();
  } catch (error) {
    return SwalError(error);
  }
};

export const deleteToApi = async (path) => {
  try {
    const response = await fetch(path, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });
    if (validateResponse(response)) return await response.json();
  } catch (error) {
    return SwalError(error);
  }
};

const validateResponse = (response) => {
  if (response.status === 500) {
    return SwalError({
      message:
        "Error en el Servidor. Ponerse en contacto con el administrador.",
    });
  }
  return true;
};

export const validateStatus = (response) => {
  if (response.status === "error" && response.message === "jwt-expired") {
    return "jwt-expired";
  }
  if (response.status === "error") return SwalError(response);
  return response;
};

export const formatPrice = (price) => {
  let p = price.toLocaleString("en-US");
  let index = p.indexOf(".");
  return index === -1
    ? p.replaceAll(",", ".")
    : p.slice(0, index).replaceAll(",", ".");
};

export const getTotalOrder = (order) =>
  order.products.reduce((acc, val) => {
    return (acc += Number(val.priceList1WithTax));
  }, Number(order.costo));

export const SwalError = async (error) => {
  return Swal.fire({
    text: `${error.message}`,
    icon: "error",
  });
};

export const SwalSuccess = async (message) => {
  return Swal.fire({
    icon: "success",
    text: `${message}`,
    position: "center",
    showConfirmButton: true,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};

export const SwalToast = async (message, timer = 3000) => {
  return Swal.fire({
    toast: true,
    icon: "success",
    text: `${message}`,
    position: "top-end",
    timer,
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};

export const SwalWaiting = async (message) => {
  return Swal.fire({
    title: "Wait...",
    html: `<strong>${message}</strong>`,
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const validateUserRole = (user, ...roles) => roles.includes(user?.role);

export const capitalize = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

export const question = async (questionMessage = "Confirmar accion??") => {
  const response = await Swal.fire({
    text: `${questionMessage}?`,
    showCancelButton: true,
    confirmButtonText: "Aceptar",
  });
  return response.isConfirmed;
};

export const filterOrders = (orders, estado, sector) => {
  return orders.filter(
    (order) => order.estado === estado && order.codiart === sector
  );
};

export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};

export const translateInvoiceState = (invoiceState) => {
  const translate = { pay: "Pago", pending: "Pendinte", toFree: "A liberar" };

  return translate[invoiceState];
};

export const translateDeliveryState = (deliveryState) =>
  deliveryState ? "Entregado" : "Pendiente";

export const bgDeliveryState = (deliveryState) =>
  deliveryState ? "bg-success" : "bg-danger";

export const bgInvoiceState = (invoiceState) => {
  if (invoiceState === "pay") return "bg-success";
  if (invoiceState === "pending") return "bg-danger";
  if (invoiceState === "toFree") return "bg-warning";
};

export const formatPaymentDate = (paymentDate) =>
  paymentDate ? moment(paymentDate).format("YYYY-MM-DD") : "";

export const isNotANumber = (value) => value === "" || isNaN(value);

export const isLessThanZero = (value) => Number(value) < 0;

export const getInfoAllPendingServiceWorks = async ({ user }) => {
  const serviceWorkInfo = {
    pc: 0,
    printers: 0,
    process: 0,
    myWorks: 0,
  };
  const url = `http://${import.meta.env.VITE_URL_HOST}/api/orders/pendings-all`;

  const data = await getFromApi(url);

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

export const getOrderState = (state) => {
  if (state === 21) return "PENDIENTE";
  if (state === 22) return "EN PROCESO";
  if (state === 23) return "FINALIZADA";
};

export const getOrderDiagnosis = (diagnosis) => {
  if (diagnosis === 21) return "PENDIENTE";
  if (diagnosis === 22) return "REPARADO";
  if (diagnosis === 23) return "SIN REPARACION";
};

export const getOrderUbication = (ubication) => {
  if (ubication === 21) return "SIN ENTREGAR";
  if (ubication === 22) return "ENTREGADO";
};

export const getOrderTier = (tier) => {
  if (tier === 0) return "NORMAL";
  if (tier === 1) return "";
  if (tier === 2) return "";
  if (tier === 3) return "ARMADOS";
  if (tier === 4) return "TURNOS/PRIORIDADES";
  if (tier === 5) return "GARANTIA REPARACION";
  if (tier === 6) return "";
  if (tier === 7) return "";
  if (tier === 8) return "BOXES";
  if (tier === 9) return "ABONADOS";
  if (tier === 10) return "GARANTIA COMPRA";
};

export const getOrderTierBackground = (tier) => {
  if (tier === 0) return "";
  if (tier === 1) return "tier1";
  if (tier === 2) return "tier2";
  if (tier === 3) return "tier3";
  if (tier === 4) return "tier4";
  if (tier === 5) return "tier5";
  if (tier === 6) return "tier6";
  if (tier === 7) return "tier7";
  if (tier === 8) return "tier8";
  if (tier === 9) return "tier9";
  if (tier === 10) return "tier10";
};

export const getOrderDiagnosisBackground = (diagnosis) => {
  if (diagnosis === 21) return "";
  if (diagnosis === 22) return "success";
  if (diagnosis === 23) return "danger";
};

export const getOrderStateBackground = (state) => {
  if (state === 21) return "danger";
  if (state === 22) return "warning";
  if (state === 23) return "success";
};

export const isTurno = (falla) => falla.toLowerCase().includes("turno");

export const formatSerialNumber = (serie) => serie.replaceAll("'", "-");

export const validateFreeOrder = (user, order) => {
  return (
    (user.role === "premium" &&
      order.estado !== 21 &&
      order.ubicacion !== 22) ||
    (user.role === "technical" &&
      order.estado === 22 &&
      order.tecnico === user?.code_technical)
  );
};
