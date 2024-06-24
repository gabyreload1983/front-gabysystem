export const API_URL =
  process.env.NODE_ENV === "production"
    ? "http://192.168.8.151:3400"
    : "http://localhost:3400";

export const tiers = [
  "0-NORMAL",
  "1",
  "2",
  "3-ARMADOS",
  "4-TURNOS/PRIORIDADES",
  "5-GARANTIA REPARACION",
  "6",
  "7",
  "8-BOXES",
  "9-ABONADOS",
  "10-GARANTIA COMPRA",
];

export const colorsTiers = [
  "#c4c7b4",
  "#727950",
  "#e4f58d",
  "#d3e910",
  "#54c0db",
  "#ffc107",
  "#1fe66b",
  "#a83e73",
  "#f02727",
  "#fd7e14",
  "#ff0000",
];

export const serviceWorkTemplate = {
  code: "",
  client: "",
  phone: "",
  mail: "",
  codiart: "",
  descart: "",
  serie: "",
  operador: "",
  falla: "",
  accesorios: "",
  prioridad: "",
  saler: "",
};
