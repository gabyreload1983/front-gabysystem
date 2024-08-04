import moment from "moment";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/tools";

export default function AccountList({ account }) {
  return (
    <>
      {account?.length &&
        account.map((item) => (
          <Link to={item.internalId} key={item._id} className="row rowSales">
            <div className="col border-end">
              {moment(item.createdAt).format("DD-MM-YYYY")}
            </div>
            <div className="col border-end">{item.type}</div>
            <div className="col border-end">{item.internalId}</div>
            <div className="col border-end">{item.observation}</div>
            <div className="col border-end d-flex justify-content-between">
              {item.type === "FV" ? (
                <></>
              ) : (
                <>
                  <span>$</span>
                  <span>{formatPrice(item.value)}</span>
                </>
              )}
            </div>
            <div className="col border-end d-flex justify-content-between">
              {item.type === "PAY" ? (
                <></>
              ) : (
                <>
                  <span>$</span>
                  <span>{formatPrice(item.value)}</span>
                </>
              )}
            </div>
          </Link>
        ))}
    </>
  );
}
