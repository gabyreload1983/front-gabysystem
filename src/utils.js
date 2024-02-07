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
