import OrderDetail from "../../../components/OrderDetail";
import moment from "moment";
import {
  getOrderDiagnosis,
  getOrderDiagnosisBackground,
  getOrderTier,
} from "../../Orders/orderUtils";

export default function Accordion({ orders }) {
  return (
    <>
      <div className="accordion" id="accordionOrders">
        {orders.length > 0 &&
          orders.map((order) => (
            <div key={order.nrocompro} className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button collapsed bg-${getOrderDiagnosisBackground(
                    order.diag
                  )}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${order.nrocompro}`}
                  aria-expanded="false"
                  aria-controls={order.nrocompro}
                >
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col">{order.nrocompro}</div>
                      <div className="col">{order.nombre}</div>
                      <div className="col">
                        DELAY:{" "}
                        {moment(order.diagnosticado)
                          .diff(moment(order.ingresado), "days", true)
                          .toFixed()}
                      </div>
                      <div className="col">
                        TIER: {getOrderTier(order.prioridad)}
                      </div>
                      <div className="col">{getOrderDiagnosis(order.diag)}</div>
                    </div>
                  </div>
                </button>
              </h2>
              <div
                id={order.nrocompro}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionOrders"
              >
                <div className="accordion-body">
                  <OrderDetail order={order} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
