import moment from "moment";
import React from "react";
import { getOrderState, getOrderUbication } from "../Orders/orderUtils";

export default function CustomerOrdersList({ orders, onSearchOrderDetail }) {
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr className="table-success">
            <th scope="col">FECHA</th>
            <th scope="col">NRO</th>
            <th scope="col">PRODUCTO</th>
            <th scope="col">ESTADO</th>
            <th scope="col">UBICACION</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr
                key={order.nrocompro}
                className="cursor-pointer"
                onClick={() => onSearchOrderDetail(order.nrocompro)}
              >
                <td> {moment(order.ingresado).format("DD/MM/YYYY hh:mm a")}</td>
                <td>{order.nrocompro}</td>
                <td>{order.descart}</td>
                <td>{getOrderState(order.estado)}</td>
                <td>{getOrderUbication(order.ubicacion)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
