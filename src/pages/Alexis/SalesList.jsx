import moment from "moment";
import { Link } from "react-router-dom";
import {
  bgDeliveryState,
  bgInvoiceState,
  formatPrice,
  translateDeliveryState,
  translateInvoiceState,
} from "../../utils";

export default function SalesList({ sales }) {
  console.log(sales);
  return (
    <>
      {sales.length &&
        sales.map((sale) => (
          <Link
            to={sale.invoiceId}
            key={sale.invoiceId}
            className="row rowSales"
          >
            <div className="col d-none d-lg-block">
              {moment(sale.date).format("DD-MM-YYYY")}
            </div>
            <div className="col col-lg text-truncate">{sale.customer}</div>
            <div className="col col-lg">{sale.invoiceId}</div>
            <div className="col d-none d-lg-block">
              $ {formatPrice(sale.subTotal + sale.tax)}
            </div>
            <div
              className={`col-2 col-lg ${bgInvoiceState(sale.invoiceState)}`}
            >
              {translateInvoiceState(sale.invoiceState)}
            </div>
            <div className="col d-none d-lg-block">
              {(sale.paymentDate &&
                moment(sale.paymentDate).format("DD-MM-YYYY")) ||
                "-"}
            </div>
            <div className="col d-none d-lg-block">
              {sale.purchaseOrder || "-"}
            </div>
            <div
              className={`col-2 col-lg ${bgDeliveryState(sale.deliveryState)}`}
            >
              {translateDeliveryState(sale.deliveryState)}
            </div>
          </Link>
        ))}
    </>
  );
}
