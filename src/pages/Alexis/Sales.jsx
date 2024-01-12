import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import SalesList from "./SalesList";
import { SwalError, SwalToast, SwalWaiting } from "../../utils";
import moment from "moment";

export default function Sales() {
  const { logoutUserContext } = useContext(UserContext);
  const [sales, setSales] = useState([]);
  const [salesPartial, setSalesPartial] = useState([]);

  const getSales = async () => {
    try {
      const response = await axios.get(
        `http://${import.meta.env.VITE_URL_HOST}/api/sales-commissions`,
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
            .filter((sale) => sale.type === "FV")
            .toSorted((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 100)
        );
      }
    } catch (error) {
      console.log(error);
      SwalError(error);
      if (error?.response?.status === 403) {
        logoutUserContext();
      }
    }
  };

  const updateSales = async () => {
    try {
      const body = {
        from: moment().format("YYYY-01-01 00:00:00"),
        to: moment().format("YYYY-MM-DD 23:59:59"),
      };

      const response = await axios.post(
        `http://${
          import.meta.env.VITE_URL_HOST
        }/api/sales-commissions/apply-invoices`,
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
        getSales();
      }
    } catch (error) {
      SwalError(error);
      if (error?.response?.status === 403) {
        logoutUserContext();
      }
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div className="row">
      <div className="col">
        <div className="col d-flex justify-content-between align-items-center">
          <h2>VENTAS {moment().format("YYYY")}</h2>
          <button onClick={updateSales} className="btn btn-outline-success">
            ACTUALIZAR
          </button>
        </div>
        <h3>CANTIDAD: {sales.length}</h3>
        <div className="row bg-success">
          <div className="col-1">FECHA</div>
          <div className="col-4">CLIENTE</div>
          <div className="col-2">COMPROBANTE</div>
          <div className="col-1">OC</div>
          <div className="col-1">PAGO</div>
          <div className="col-1">FLETE</div>
          <div className="col-1">FLETERO</div>
          <div className="col-1">ENTRAGADO</div>
        </div>

        {salesPartial.length && <SalesList sales={salesPartial} />}
      </div>
    </div>
  );
}
