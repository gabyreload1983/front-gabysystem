import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import SalesList from "./SalesList";
import { SwalError, SwalToast, SwalWaiting } from "../../utils";
import moment from "moment";
import { API_URL } from "../../constants";

export default function Sales() {
  const { logoutUserContext } = useContext(UserContext);
  const [sales, setSales] = useState([]);
  const [salesPartial, setSalesPartial] = useState([]);
  const CURRENT_YEAR = moment().format("YYYY");
  const yearsAvailable = [
    CURRENT_YEAR,
    CURRENT_YEAR - 1,
    ,
    CURRENT_YEAR - 2,
    CURRENT_YEAR - 3,
    CURRENT_YEAR - 4,
    CURRENT_YEAR - 5,
  ];
  const [year, setYear] = useState(CURRENT_YEAR);

  const getSales = async (year) => {
    try {
      const from = moment().format(`${year}-01-01`);
      const to = moment().format(`${year}-12-31`);

      const response = await axios.get(
        `${API_URL}/api/alexis/sales?from=${from}&to=${to}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (response?.data?.payload) {
        const sales = response.data.payload;
        setSales(sales);
        setSalesPartial(
          sales
            .filter((sale) => sale.type === "FV" && sale.isValid)
            .toSorted((a, b) => new Date(b.date) - new Date(a.date))
        );
      }
    } catch (error) {
      SwalError(error);
      if (error?.response?.status === 403) {
        logoutUserContext();
      }
    }
  };

  const updateSalesCurrentYear = async () => {
    try {
      const body = {
        from: moment().format(`${year}-01-01 00:00:00`),
        to: moment().format(`${year}-12-31 23:59:59`),
      };

      const response = await axios.post(
        `${API_URL}/api/alexis/sales/refresh`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      SwalWaiting("Actualizando...");

      if (response?.data?.status === "success") {
        SwalToast("Se actualizaron facturas");
        getSales(year);
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
    getSales(value);
  };

  useEffect(() => {
    getSales(year);
  }, []);

  return (
    <div className="row">
      <div className="col">
        <div className="col d-flex justify-content-between align-items-center">
          <div className="col-7 col-md-5 col-lg-3 d-flex">
            <span className="input-group-text me-3">VENTAS</span>
            <select
              value={year}
              name="year"
              id="year"
              className="form-select"
              onChange={handleYear}
            >
              {yearsAvailable.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="col-5 col-md-3 col-lg-2">
            <button
              onClick={updateSalesCurrentYear}
              className="btn btn-outline-success"
            >
              ACTUALIZAR
            </button>
          </div>
        </div>
        <h3>CANTIDAD: {salesPartial.length}</h3>
        <div className="row bg-success">
          <div className="col-1">FECHA</div>
          <div className="col-3">CLIENTE</div>
          <div className="col-2">COMPROBANTE</div>
          <div className="col-1">PAGO</div>
          <div className="col-1">FECHA PAGO</div>
          <div className="col-1">OC</div>
          <div className="col-1">FLETETERO</div>
          <div className="col-1">IMPORTE</div>
          <div className="col-1">ENTREGADO</div>
        </div>

        {salesPartial.length && <SalesList sales={salesPartial} />}
      </div>
    </div>
  );
}
