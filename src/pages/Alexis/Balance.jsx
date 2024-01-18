import { useEffect, useState } from "react";
import BalanceList from "./BalanceList";
import moment from "moment";
import { SwalError, formatPrice } from "../../utils";
import axios from "axios";

export default function Balance() {
  const [balance, setBalance] = useState([]);
  const [balanceTotal, setBalanceTotal] = useState(0);

  const getCurrentBalance = async () => {
    try {
      const from = moment().format("YYYY-01-01");
      const to = moment().format("YYYY-MM-DD");

      const response = await axios.get(
        `http://${
          import.meta.env.VITE_URL_HOST
        }/api/commissions?from=${from}&to=${to}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (response?.data?.payload) {
        const data = response.data.payload;
        setBalance(
          data.toSorted((a, b) => new Date(b.date) - new Date(a.date))
        );

        setBalanceTotal(
          data.reduce((acc, val) => {
            if (val.type === "FV") acc += Number(val.rent);
            if (val.type === "PAY") acc -= Number(val.rent);
            return acc;
          }, 0)
        );
      }
    } catch (error) {
      SwalError(error);
      if (error?.response?.status === 403) {
        logoutUserContext();
      }
    }
  };

  useEffect(() => {
    getCurrentBalance();
  }, []);

  return (
    <div className="row">
      <div className="col">
        <div className="col d-flex justify-content-between align-items-center">
          <h2>BALANCE {moment().format("YYYY")}</h2>
          <h3
            className={
              balanceTotal >= 0
                ? "bg-success rounded p-2"
                : "bg-danger rounded p-2"
            }
          >
            ${formatPrice(balanceTotal)}
          </h3>
        </div>
        <div className="row bg-success">
          <div className="col">FECHA</div>
          <div className="col">TIPO</div>
          <div className="col">COMPROBANTE</div>
          <div className="col">OBSERVACION</div>
          <div className="col">DEBE</div>
          <div className="col">HABER</div>
        </div>

        {balance?.length && <BalanceList balance={balance} />}
      </div>
    </div>
  );
}
