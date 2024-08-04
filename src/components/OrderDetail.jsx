import moment from "moment";
import {
  formatPrice,
  getOrderDiagnosis,
  getOrderDiagnosisBackground,
  getOrderState,
  getOrderTier,
  getOrderTierBackground,
  getOrderUbication,
} from "../utils/tools";

export default function OrderDetail({ order }) {
  const total = order.products.reduce(
    (acc, current) => acc + current,
    order.costo
  );

  return (
    <div
      className={`row border border-5 border-${getOrderDiagnosisBackground(
        order.diag
      )}`}
    >
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
              <td className="table-warning">
                FALLA: <span>{order.falla}</span>
              </td>
            </tr>
            <tr>
              <td className="table-success">
                DIAGNOSTICO: <span>{order.diagnostico}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-12">
        <h4>ARTICULOS</h4>

        <table className="table">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Descripcion</th>
              <th>Serie</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>.ST</td>
              <td>Mano de Obra</td>
              <td></td>
              <td>${formatPrice(order.costo)}</td>
            </tr>
            {order.products.length > 0 &&
              order.products.map((product, index) => {
                return (
                  <tr key={`${product.nrocompro}-${index}`}>
                    <td>{product.codigo}</td>
                    <td>{product.descrip}</td>
                    <td>{product.serie}</td>
                    <td>${formatPrice(product.priceList1WithTax)}</td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td className="table-secondary">TOTAL</td>
              <td className="table-secondary">${formatPrice(total)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
