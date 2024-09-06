import moment from "moment";
import { colorsTiers, tiers } from "../constants";

export const wait = async (delay) =>
  await new Promise((resolve) => setTimeout(resolve, delay));

export const getJWT = () => localStorage.getItem("jwtToken");

export const destroyJwt = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
  window.location.replace("/login");
  return false;
};

export const formatPrice = (price) => {
  let p = price.toLocaleString("en-US");
  let index = p.indexOf(".");
  return index === -1
    ? p.replaceAll(",", ".")
    : p.slice(0, index).replaceAll(",", ".");
};

export const formatDate = (date) => moment(date).format("DD-MM-YYYY");

export const validateWarranty = (date) => {
  const result = moment()
    .startOf("day")
    .diff(moment(date).startOf("day"), "days");
  return result < 365;
};

export const capitalize = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

export const isInvalidChar = (char) => /[^a-zA-Z0-9-]/.test(char);

export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};

export const formatPaymentDate = (paymentDate) =>
  paymentDate ? moment(paymentDate).format("YYYY-MM-DD") : "";

export const isNotANumber = (value) => value === "" || isNaN(value);

export const isLessThanZero = (value) => Number(value) < 0;

export const formatSerialNumber = (serie) => serie.replaceAll("'", "-");

export const getTotalOrder = (order) => {
  const total = order.products.reduce((acc, val) => {
    return (acc += Number(val.priceList1WithTax));
  }, Number(order.costo));
  return formatPrice(total);
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

export const getOrderTier = (tier) => tiers[tier];

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

export const getinvoicesBalanceBackground = (balance) =>
  balance > 1 ? "bg-danger" : "bg-success";

export const isTurno = (falla) => falla.toLowerCase().includes("turno");

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

export const formatNameSector = ({ sector }) => {
  if (sector === ".PC") return "PC";
  if (sector === ".IMP") return "Impresoras";
};

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

export const formatProductSerie = (product) => {
  product.voucher = product.voucher_c ? product.voucher_c : product.voucher_s;
  product.purchase_date = product.purchase_date_c
    ? product.purchase_date_c
    : product.purchase_date_s;
  return product;
};

export const isSubscriber = (subscriber) => subscriber.condicion === 30;

export const filterEquipmentType = (subscriber, type) =>
  subscriber.equipments.filter(
    (equipment) => equipment.equipment_type === type
  );

export const getQuantityOfEquipmentType = (subscriber, type) =>
  subscriber.equipments.filter((equipment) => equipment.equipment_type === type)
    .length;
