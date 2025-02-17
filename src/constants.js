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
  sector: "",
  description: "",
  serie: "",
  fail: "",
  accesories: "",
  priority: "",
};

export const TABLE_HEADER_PRODUCTS_REQUEST = [
  {
    id: 1,
    name: "FECHA",
    code: "fecha",
    styles: "cursor-pointer d-none d-lg-table-cell",
    selected: true,
    order: true,
  },
  {
    id: 2,
    name: "CODIGO",
    code: "codiart",
    styles: "cursor-pointer",
    selected: false,
    order: false,
  },
  {
    id: 3,
    name: "DESCRIPCION",
    code: "descart",
    styles: "cursor-pointer",
    selected: false,
    order: false,
  },

  {
    id: 4,
    name: "CANTIDAD",
    code: "cantidad",
    styles: "cursor-pointer",
    selected: false,
    order: false,
  },

  {
    id: 5,
    name: "SOLICITO",
    code: "soliciton",
    styles: "cursor-pointer d-none d-lg-table-cell",
    selected: false,
    order: false,
  },
  {
    id: 6,
    name: "CLIENTE",
    code: "nombre",
    styles: "cursor-pointer d-none d-lg-table-cell",
    selected: false,
    order: false,
  },
  {
    id: 7,
    name: "OBSERVACION",
    code: "observation",
    styles: "cursor-pointer d-none d-lg-table-cell",
    selected: false,
    order: false,
  },
  {
    id: 8,
    name: "",
    code: "",
    styles: "cursor-pointer",
    selected: false,
    order: false,
  },
  {
    id: 9,
    name: "",
    code: "",
    styles: "cursor-pointer",
    selected: false,
    order: false,
  },
];
