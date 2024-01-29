import { useEffect, useState } from "react";
import AccountList from "./AccountList";
import moment from "moment";
import { SwalError, formatPrice } from "../../utils";
import axios from "axios";

export default function Account() {
  const [account, setAccount] = useState([]);
  const [accountTotal, setAccountTotal] = useState(0);
  const YEAR = moment().format("YYYY");
  const [year, setYear] = useState(moment().format("YYYY"));

  const getAccount = async (year) => {
    try {
      const from = moment().format(`${year}-01-01`);
      const to = moment().format(`${year}-12-31`);

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
          data.toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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

  const handleYear = (e) => {
    const { value } = e.target;
    setYear(value);
    getAccount(value);
  };

  useEffect(() => {
    getAccount(year);
  }, []);

  return (
    <div className="row">
      <div className="col">
        <div className="row justify-content-between align-items-center">
          <div className="col-7 col-md-5 col-lg-3 d-flex">
            <span className="input-group-text me-3">SALDO</span>
            <select
              value={year}
              name="year"
              id="year"
              className="form-select"
              onChange={handleYear}
            >
              <option>{YEAR}</option>
              <option value={YEAR - 1}>{YEAR - 1}</option>
              <option value={YEAR - 2}>{YEAR - 2}</option>
              <option value={YEAR - 3}>{YEAR - 3}</option>
            </select>
          </div>
          <div className="col-5 col-md-3 col-lg-2">
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
