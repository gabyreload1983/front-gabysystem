import React from "react";
import { formatPrice } from "../../utils";

export default function ProductDetail({ product }) {
  return (
    <>
      <td>{product.codigo}</td>
      <td>{product.descrip}</td>
      <td>{product.stockd01 - product.reserd01}</td>
      <td>${formatPrice(product.priceList1WithTax)}</td>
    </>
  );
}
