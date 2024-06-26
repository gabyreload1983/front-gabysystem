import moment from "moment";
import Swal from "sweetalert2";
import { API_URL, colorsTiers, tiers } from "./constants";
import { jwtDecode } from "jwt-decode";

export const getFromApi = async (path) => {
  try {
    const response = await fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getJWT()}`,
      },
    });
    if (await validateResponse(response)) return await response.json();
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
        Authorization: `Bearer ${getJWT()}`,
      },
    });
    if (await validateResponse(response)) return await response.json();
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
        Authorization: `Bearer ${getJWT()}`,
      },
    });
    if (await validateResponse(response)) return await response.json();
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
        Authorization: `Bearer ${getJWT()}`,
      },
    });
    if (await validateResponse(response)) return await response.json();
  } catch (error) {
    return SwalError(error);
  }
};

const validateResponse = async (response) => {
  if (response.status === 500) {
    return SwalError({
      message:
        "Error en el Servidor. Ponerse en contacto con el administrador.",
    });
  }

  if (response.status === 403) {
    const json = await response.json();
    if (json.message === "jwt-expired") {
      destroyJwt();
    }
  }

  return true;
};

export const destroyJwt = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
  return window.location.replace("/login");
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

export const getTotalOrder = (order) => {
  const total = order.products.reduce((acc, val) => {
    return (acc += Number(val.priceList1WithTax));
  }, Number(order.costo));
  return formatPrice(total);
};

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
  const url = `${API_URL}/api/orders/pendings-all`;

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
  if (tier === 1) return "1";
  if (tier === 2) return "2";
  if (tier === 3) return "ARMADOS";
  if (tier === 4) return "TURNOS/PRIORIDADES";
  if (tier === 5) return "GARANTIA REPARACION";
  if (tier === 6) return "6";
  if (tier === 7) return "7";
  if (tier === 8) return "BOXES";
  if (tier === 9) return "ABONADOS";
  if (tier === 10) return "GARANTIA COMPRA";
};

export const getOrderTierBackground = (tier) => {
  if (tier === 0) return "table-dark";
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
  if (diagnosis === 21) return "border rounded";
  if (diagnosis === 22) return "bg-success";
  if (diagnosis === 23) return "bg-danger";
};

export const getOrderStateBackground = (state) => {
  if (state === 21) return "bg-danger";
  if (state === 22) return "bg-warning";
  if (state === 23) return "bg-success";
};

export const getOrderUbicationBackground = (ubication) => {
  if (ubication === 21) return "border rounded";
  if (ubication === 22) return "bg-success";
};

export const isTurno = (falla) => falla.toLowerCase().includes("turno");

export const formatSerialNumber = (serie) => serie.replaceAll("'", "-");

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

export const takeServiceWork = async ({ nrocompro, codeTechnical }) =>
  await putToApi(`${API_URL}/api/orders/take`, {
    nrocompro: `${nrocompro}`,
    code_technical: `${codeTechnical}`,
  });

export const validateEditServiceWork = (user, order) => {
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
    (user.role === "premium" || user.role === "saler") &&
    order.estado === 23 &&
    order.ubicacion === 21
  );
};

export const getOrder = async ({ id }) => {
  const path = `${API_URL}/api/orders/${id}`;
  const data = await getFromApi(path);
  return data.payload;
};

export const wait = async (delay) =>
  await new Promise((resolve) => setTimeout(resolve, delay));

export const searchProduct = async ({ input, searchBy = "description" }) => {
  const response = await getFromApi(
    `${API_URL}/api/products/search-by?${searchBy}=${input}`
  );

  return response.payload;
};

export const validateSerieMatchProduct = async (product, serie) => {
  const response = await getFromApi(`${API_URL}/api/products/serie/${serie}`);

  if (response.payload.length) {
    const productFind = response.payload[0];
    if (product.codigo !== productFind.codigo) {
      await SwalError({
        message: `El serie pertenece al producto ${productFind.codigo}`,
      });
      return false;
    }
  }
  return true;
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
  return response.payload;
};

export const getStatisticsRepairPending = ({ data }) => {
  const ordersStatistics = [
    ["Reparadas", 0],
    ["Pendientes", 0],
  ];

  data?.forEach((serviceWork) => {
    if (serviceWork.estado === 23) ordersStatistics[0][1]++;
    if (serviceWork.estado !== 23) ordersStatistics[1][1]++;
  });

  const dataPie = [[`Ordenes Ingresadas`, "Cantidad"], ...ordersStatistics];
  const options = {
    title: `Ordenes Ingresadas: ${data.length}`,
    is3D: true,
    colors: ["#2BBD51", "#E1E355"],
  };

  return { dataPie, options };
};

export const getStatisticsInOut = ({ data }) => {
  const ordersStatistics = [
    ["Entregadas", 0],
    ["Sin Entregar", 0],
  ];

  data?.forEach((serviceWork) => {
    if (serviceWork.estado === 23 && serviceWork.ubicacion === 22)
      ordersStatistics[0][1]++;
    if (serviceWork.estado === 23 && serviceWork.ubicacion === 21)
      ordersStatistics[1][1]++;
  });

  const dataPie = [[`Ordenes Reparadas`, "Cantidad"], ...ordersStatistics];
  const options = {
    title: `Ordenes Reparadas: ${ordersStatistics.reduce(
      (acc, val) => acc + val[1],
      0
    )}`,
    is3D: true,
    colors: ["#306EBB", "#BB903D"],
  };

  return { dataPie, options };
};

export const filterServicesWorkBySector = ({ data, sector }) =>
  data.filter((sw) => sw.codiart === sector);

export const getSectorStatistics = ({ data, sector }) => {
  const serviceWoksFiltered = filterServicesWorkBySector({ data, sector });

  const items = tiers.map((item) => [item, 0]);
  serviceWoksFiltered?.forEach((serviceWork) => {
    if (serviceWork.estado === 23) {
      items[serviceWork.prioridad][1]++;
    }
  });

  const dataPie = [[`${sector} reparadas`, "Cantidad"], ...items];
  const options = {
    title: `${formatNameSector({ sector })} Reparadas ${items.reduce(
      (acc, val) => acc + val[1],
      0
    )}`,
    is3D: true,
    colors: colorsTiers,
  };

  return { dataPie, options };
};

export const formatNameSector = ({ sector }) => {
  if (sector === ".PC") return "PC";
  if (sector === ".IMP") return "Impresoras";
};

export const getJWT = () => localStorage.getItem("jwtToken");

export const getUser = () => {
  const jwt = getJWT();
  if (!jwt) return null;
  const { user } = jwtDecode(jwt);
  return user;
};

export const getCustomers = async (description) => {
  const response = await getFromApi(`${API_URL}/api/customers/${description}`);
  return response.payload;
};

export const getPdfServiceWork = async ({ nrocompro }) => {
  const response = await getFromApi(`${API_URL}/api/orders/pdf/${nrocompro}`);
  return response.payload;
};
