import moment from "moment";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils";

export default function BalanceList({ balance }) {
  return (
    <>
      {balance?.length &&
        balance.map((item) => (
          <Link to={item.numberId} key={item._id} className="row rowSales">
            <div className="col border-end">
              {moment(item.date).format("DD-MM-YYYY")}
            </div>
            <div className="col border-end">{item.type}</div>
            <div className="col border-end">{item.numberId}</div>
            <div className="col border-end">{item.observation}</div>
            <div className="col border-end d-flex justify-content-between">
              {item.type === "FV" ? (
                <>
                  <span>$</span>
                  <span>{formatPrice(item.value)}</span>
                </>
              ) : (
                <span>$</span>
              )}
            </div>
            <div className="col border-end d-flex justify-content-between">
              {item.type === "PAY" ? (
                <>
                  <span>$</span>
                  <span>{formatPrice(item.value)}</span>
                </>
              ) : (
                <>
                  <span>$</span>
                </>
              )}
            </div>
          </Link>
        ))}
    </>
  );
}
