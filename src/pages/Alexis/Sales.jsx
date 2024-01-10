import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import SalesList from "./SalesList";
import { SwalError } from "../../utils";

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
        const sales = response.data.payload.toReversed();
        console.log(sales);
        setSales(sales);
        setSalesPartial(
          sales
            .filter((sale) => sale.type === "FV")
            .toReversed()
            .slice(0, 30)
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

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div className="row">
      <div className="col">
        <h2>VENTAS ALEXIS {sales.length}</h2>
        <div className="row bg-success">
          <div className="col-1">FECHA</div>
          <div className="col-3">CLIENTE</div>
          <div className="col-2">COMPROBANTE</div>
          <div className="col-1">OC</div>
          <div className="col-1">GANANCIA</div>
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
