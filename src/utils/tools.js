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

export const capitalize = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

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
