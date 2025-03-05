export const API_URL =
  process.env.NODE_ENV === "production"
    ? "http://192.168.8.151:3400"
    : "http://localhost:3400";

export const TIERS = [
  {
    id: "000",
    description: "0-NORMAL",
    value: 0,
  },
  {
    id: "001",
    description: "1",
    value: 1,
  },
  {
    id: "002",
    description: "2",
    value: 2,
  },
  {
    id: "003",
    description: "3-ARMADOS",
    value: 3,
  },
  {
    id: "004",
    description: "4-TURNOS/PRIORIDADES",
    value: 4,
  },
  {
    id: "005",
    description: "5-GARANTIA REPARACION",
    value: 5,
  },
  {
    id: "006",
    description: "6",
    value: 6,
  },
  {
    id: "007",
    description: "7",
    value: 7,
  },
  {
    id: "008",
    description: "8-BOXES",
    value: 8,
  },
  {
    id: "009",
    description: "9-ABONADOS",
    value: 9,
  },
  {
    id: "010",
    description: "10-GARANTIA COMPRA",
    value: 10,
  },
];

export const SALES_CONDITION = {
  ABONADOS: 30,
};

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

export const replacementInputsEdit = [
  { name: "descripcion", code: "description", value: "", required: true },
  { name: "tecnico", code: "technical_code", value: "", required: true },
  { name: "orden", code: "orderNumber", value: "", required: false },
  { name: "proveedor", code: "supplier", value: "", required: false },
  { name: "costo", code: "cost", value: "", required: false },
  { name: "demora", code: "delay", value: "", required: false },
  { name: "envio", code: "shipmment", value: "", required: false },
  { name: "link", code: "linkSupplier", value: "", required: false },
  { name: "precio final", code: "finalPrice", value: "", required: false },
  { name: "Estado", code: "status", value: "", required: false },
  {
    name: "Confirmacion Cliente",
    code: "customerConfirmation",
    value: false,
    required: false,
  },
  { name: "Notas", code: "notes", value: "", required: false },
];

export const ROLES = {
  ADMIN: "admin",
  PREMIUM: "premium",
  SELLER: "seller",
  TECHNICAL: "technical",
};
