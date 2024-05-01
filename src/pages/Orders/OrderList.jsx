import { Link } from "react-router-dom";
import { isTurno, getOrderTier, getOrderTierBackground } from "./orderUtils";
import moment from "moment";

export default function OrderList({ orders }) {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>FECHA</th>
            <th>NRO ORDEN</th>
            <th>CLIENTE</th>
            <th>TIER</th>
            <th>
              {" "}
              {orders.length > 0 && orders[0].estado === 22 && "TECNICO"}
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order, index) => {
              return (
                <tr
                  key={`${order.nrocompro}`}
                  className={getOrderTierBackground(order.prioridad)}
                >
                  <td>{index + 1}</td>
                  <td>
                    {moment(order.ingresado).format("DD/MM/YYYY hh:mm a")}
                  </td>
                  <td>
                    <Link
                      to={`/orders/detail/${order.nrocompro}`}
                      className="link-order"
                    >
                      {order.nrocompro}
                      {isTurno(order.falla) && (
                        <span className="badge bg-dark ms-2">TURNO</span>
                      )}
                    </Link>
                  </td>
                  <td>{order.nombre} - </td>
                  <td>{getOrderTier(order.prioridad)}</td>
                  <td>{order.estado === 22 && order.tecnico}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
