export const API_URL =
  process.env.NODE_ENV === "production"
    ? "http://192.168.8.151:3400"
    : "http://localhost:3400";
