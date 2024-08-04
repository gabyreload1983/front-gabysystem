import moment from "moment";
import { API_URL } from "../constants";
import { getFromApi, postToApi } from "./api";
const RENT_PORCENTAGE = 0.4;
const CHECH_TAX_PORCENTAGE = 1.2 / 100;

export const getAlexisSalesFrom = async (year) => {
  const from = moment().format(`${year}-01-01`);
  const to = moment().format(`${year}-12-31`);

  const response = await getFromApi(
    `${API_URL}/api/alexis/sales?from=${from}&to=${to}`
  );

  if (!response) return;
  return response.payload
    .filter((sale) => sale.type === "FV" && sale.isValid)
    .toSorted((a, b) => new Date(b.date) - new Date(a.date));
};

export const updateAlexisSalesFrom = async (year) => {
  const body = {
    from: moment().format(`${year}-01-01 00:00:00`),
    to: moment().format(`${year}-12-31 23:59:59`),
  };

  return await postToApi(`${API_URL}/api/alexis/sales/refresh`, body);
};

export const getSalesToFree = (sales) =>
  sales.filter((sale) => sale.invoiceState === "toFree");

export const getSalesToFreeTotal = (sales) =>
  getSalesToFree(sales).reduce((acc, val) => acc + getAlexisProfit(val), 0);

export const getAlexisProfit = (sale) => {
  const TOTAL_INVOICE = sale.subTotal + sale.tax;
  const CHECK_TAX = TOTAL_INVOICE * CHECH_TAX_PORCENTAGE;
  const PROFIT = sale.profit - CHECK_TAX;
  return sale.deliveryCost === 0
    ? PROFIT * RENT_PORCENTAGE
    : PROFIT * RENT_PORCENTAGE - sale.deliveryCost / 2;
};
