import moment from "moment";
import React from "react";

export default function OrderListItem({ product, onHandleRemove }) {
  return (
    <>
      <td>{moment(product.fecha).format("DD/MM/YYYY")}</td>
      <td>{product.codiart}</td>
      <td>{product.descart}</td>
      <td>{product.soliciton}</td>
      <td>{product.nombre}</td>
      <td>{Number(product.cantidad).toFixed()}</td>
      <td>
        <button
          onClick={() => onHandleRemove(product.codiart)}
          className="btn btn-outline-danger btn-sm"
        >
          x
        </button>
      </td>
    </>
  );
}
