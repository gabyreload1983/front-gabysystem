import React from "react";
import { getOrderDiagnosis, getOrderTier } from "../Orders/orderUtils";
import { Tooltip } from "react-tooltip";
import OrderDetailHeader from "../Orders/OrderDetail/OrderDetailHeader";

export default function StatisticsDetail({ statistics }) {
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr className="table-success">
            <th scope="col">TECNICO</th>
            <th scope="col">TERMINADAS</th>
            <th scope="col">SIN REPARACION</th>
            <th scope="col">ARMADOS</th>
            <th scope="col">TICKETS</th>
            <th scope="col">TOTAL</th>
            <th scope="col">Detalle</th>
          </tr>
        </thead>
        <tbody>
          {statistics.length > 0 &&
            statistics.map((st) => (
              <tr key={st.code_technical}>
                <td>{st.code_technical}</td>
                <td>{st.finished}</td>
                <td>{st.withoutRepair}</td>
                <td>{st.assembly}</td>
                <td>{st.tickets}</td>
                <td className="table-secondary">{st.total}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target={`#${st.code_technical}Modal`}
                  >
                    Detalle
                  </button>
                  <div
                    className="modal fade"
                    id={`${st.code_technical}Modal`}
                    tabIndex="-1"
                    aria-labelledby={`${st.code_technical}ModalLabel`}
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-xl">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id={`${st.code_technical}ModalLabel`}
                          >
                            Ordenes de Reparacion
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <table className="table table-responsive">
                            <thead>
                              <tr>
                                <th scope="col">NRO</th>
                                <th scope="col">CLIENTE</th>
                                <th scope="col">PRODUCTO</th>
                                <th scope="col">TIER</th>
                                <th scope="col">DIAGNOSTICO</th>
                              </tr>
                            </thead>
                            <tbody>
                              {st.orders.length > 0 &&
                                st.orders.map((order) => (
                                  <tr key={order.nrocompro}>
                                    <td
                                      data-tooltip-id={order.nrocompro}
                                      data-tooltip-content={`FALLA: ${order.diagnostico}`}
                                    >
                                      {order.nrocompro}
                                      <Tooltip
                                        place="top"
                                        id={order.nrocompro}
                                        multiline={true}
                                      />
                                    </td>
                                    <td>{order.nombre}</td>
                                    <td>{order.descart}</td>
                                    <td>{getOrderTier(order.prioridad)}</td>
                                    <td>{getOrderDiagnosis(order.diag)}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
