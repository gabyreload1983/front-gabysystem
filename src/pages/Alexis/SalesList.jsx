import moment from "moment";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils";

export default function SalesList({ sales }) {
  return (
    <>
      {sales.length &&
        sales.map((sale) => (
          <Link
            to={sale.invoiceId}
            key={sale.invoiceId}
            className="row rowSales"
          >
            <div className="col-1">
              {moment(sale.date).format("DD-MM-YYYY")}
            </div>
            <div className="col-4">{sale.customer}</div>
            <div className="col-2">{sale.invoiceId}</div>
            <div className="col-1">{sale.purchaseOrder || "-"}</div>
            <div className="col-1">{sale.stateInvoice}</div>
            <div className="col-1">{sale.delivery || "-"}</div>
            <div className="col-1 d-flex justify-content-between">
              <span>$</span>
              <span>{formatPrice(sale.deliveryCost)}</span>
            </div>
            <div className="col-1">{sale.deliveryState}</div>
          </Link>
        ))}
    </>
  );
}
