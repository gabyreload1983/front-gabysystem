import React from "react";
import {
  getOrderDiagnosis,
  getOrderState,
  getOrderTier,
  getOrderTierBackground,
  getOrderUbication,
} from "../pages/Orders/orderUtils";
import moment from "moment";

export default function OrderDetail({ order }) {
  return (
    <div className="row border border-5 border-success">
      <div className="col-12 col-md-6">
        <table className="table">
          <tbody>
            <tr>
              <td>ESTADO</td>
              <td>{getOrderState(order.estado)}</td>
            </tr>
            <tr>
              <td>DIAGNOSTICO</td>
              <td>{getOrderDiagnosis(order.diag)}</td>
            </tr>
            <tr>
              <td>UBICACION</td>
              <td>{getOrderUbication(order.ubicacion)}</td>
            </tr>
            <tr>
              <td>FECHA INGRESO</td>
              <td>{moment(order.ingresado).format("DD/MM/YYYY hh:mm a")}</td>
            </tr>
            <tr>
              <td>FECHA FINALIZADO</td>
              <td>
                {moment(order.diagnosticado).format("DD/MM/YYYY hh:mm a")}
              </td>
            </tr>
            <tr>
              <td>DIFERENCIA</td>
              <td>
                {moment(order.diagnosticado)
                  .diff(moment(order.ingresado), "days", true)
                  .toFixed()}
              </td>
            </tr>
            <tr>
              <td>PRIORIDAD</td>
              <td className={getOrderTierBackground(order.prioridad)}>
                {getOrderTier(order.prioridad)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-12 col-md-6">
        <table className="table">
          <tbody>
            <tr>
              <td>TELEFONO</td>
              <td>{order.telefono}</td>
            </tr>
            <tr>
              <td>ARTICULO</td>
              <td>{order.descart}</td>
            </tr>
            <tr>
              <td>ACCESORIOS</td>
              <td>{order.accesorios}</td>
            </tr>
            <tr>
              <td>VENDEDOR</td>
              <td>{order.operador}</td>
            </tr>
            <tr>
              <td>TECNICO</td>
              <td>{order.tecnico}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-12">
        <table className="table">
          <tbody>
            <tr>
              <td>
                FALLA: <span>{order.falla}</span>
              </td>
            </tr>
            <tr>
              <td>
                DIAGNOSTICO: <span>{order.diagnostico}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-12">
        <h4>ARTICULOS</h4>
      </div>
    </div>
  );
}
