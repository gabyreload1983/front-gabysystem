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
  "#ff0000",
  "#fd7e14",
  "#f02727",
  "#a83e73",
  "#1fe66b",
  "#ffc107",
  "#54c0db",
  "#d3e910",
  "#e4f58d",
  "#727950",
];
