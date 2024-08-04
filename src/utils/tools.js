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
