import { useEffect, useState } from "react";
import AccountList from "./AccountList";
import moment from "moment";
import { SwalError, formatPrice } from "../../utils";
import axios from "axios";

export default function Account() {
  const [account, setAccount] = useState([]);
  const [accountTotal, setAccountTotal] = useState(0);

  const getCurrentAccount = async () => {
    try {
      const from = moment().format("YYYY-01-01");
      const to = moment().format("YYYY-MM-DD");

      const response = await axios.get(
        `http://${
          import.meta.env.VITE_URL_HOST
        }/api/alexis/account?from=${from}&to=${to}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (response?.data?.payload) {
        const data = response.data.payload;
        setAccount(
          data.toSorted((a, b) => new Date(b.date) - new Date(a.date))
        );

        setAccountTotal(
          data.reduce((acc, val) => {
            if (val.type === "FV") acc += Number(val.value);
            if (val.type === "PAY") acc -= Number(val.value);
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
    getCurrentAccount();
  }, []);

  return (
    <div className="row">
      <div className="col">
        <div className="col d-flex justify-content-between align-items-center">
          <h2>SALDO {moment().format("YYYY")}</h2>
          <h3
            className={
              accountTotal >= 0
                ? "bg-success rounded p-2"
                : "bg-danger rounded p-2"
            }
          >
            ${formatPrice(accountTotal)}
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

        {account?.length && <AccountList account={account} />}
      </div>
    </div>
  );
}
