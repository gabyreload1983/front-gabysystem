import { Link } from "react-router-dom";
import {
  isTurno,
  getOrderTier,
  getOrderTierBackground,
  validateTakeServiceWork,
} from "../../utils";
import moment from "moment";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import TakeServiceWorkButton from "../../components/ServiceWork/TakeServiceWorkButton";

export default function ServiceWorkList({ serviceWorks }) {
  const { user } = useContext(UserContext);
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr className="table-light">
            <th>#</th>
            <th className="d-none d-lg-table-cell">FECHA</th>
            <th>NRO ORDEN</th>
            <th className="d-none d-md-table-cell">CLIENTE</th>
            <th className="d-none d-lg-table-cell">TIER</th>
            <th className="d-none d-lg-table-cell">
              {serviceWorks.length > 0 &&
                serviceWorks[0].estado === 22 &&
                "TECNICO"}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {serviceWorks.length > 0 &&
            serviceWorks.map((order, index) => {
              return (
                <tr
                  key={`${order.nrocompro}`}
                  className={getOrderTierBackground(order.prioridad)}
                >
                  <td>{index + 1}</td>
                  <td className="d-none d-lg-table-cell">
                    {moment(order.ingresado).format("DD/MM/YYYY hh:mm a")}
                  </td>
                  <td>
                    <Link
                      to={`/servicework/detail/${order.nrocompro}`}
                      className={
                        order.prioridad === 0 ? "table-dark" : "table-secondary"
                      }
                    >
                      {order.nrocompro}
                      {isTurno(order.falla) && (
                        <span className="badge bg-info ms-2 border">TURNO</span>
                      )}
                    </Link>
                  </td>
                  <td className="d-none d-md-table-cell">{order.nombre}</td>
                  <td className="d-none d-lg-table-cell">
                    {getOrderTier(order.prioridad)}
                  </td>
                  <td className="d-none d-lg-table-cell">
                    {order.estado === 22 && order.tecnico}
                  </td>
                  <td>
                    {validateTakeServiceWork(user, order) && (
                      <TakeServiceWorkButton
                        nrocompro={order.nrocompro}
                        codeTechnical={user.code_technical}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
