import { Link } from "react-router-dom";

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
            <div className="col-1">{sale.date.slice(0, 10)}</div>
            <div className="col-3">{sale.customer}</div>
            <div className="col-2">{sale.invoiceId}</div>
            <div className="col-1">{sale.purchaseOrder || "-"}</div>
            <div className="col-1">${sale.profit}</div>
            <div className="col-1">{sale.stateInvoice}</div>
            <div className="col-1">{sale.delivery || "-"}</div>
            <div className="col-1">${sale.deliveryCost}</div>
            <div className="col-1">{sale.deliveryState}</div>
          </Link>
        ))}
    </>
  );
}
