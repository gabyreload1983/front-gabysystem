import React from "react";
import {
  getOrderDiagnosis,
  getOrderState,
  getOrderTier,
  getOrderTierBackground,
  getOrderUbication,
} from "../../../utils";
import moment from "moment";
import SendWhatsapp from "../../../components/SendWhatsapp";

export default function OrderDetailHeader({ order }) {
  return (
    <div className="row">
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
              <td>
                <SendWhatsapp celphone={order.telefono} />
              </td>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
