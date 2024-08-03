import { useEffect, useState } from "react";
import SalesList from "./SalesList";
import { SwalToast, formatPrice } from "../../utils";
import moment from "moment";
import {
  getAlexisSalesFrom,
  getSalesToFreeTotal,
  updateAlexisSalesFrom,
} from "../../utils/alexis";

export default function Sales() {
  const [sales, setSales] = useState([]);
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
    const data = await getAlexisSalesFrom(year);

    setSales(data);
  };

  const updateSalesCurrentYear = async () => {
    const response = await updateAlexisSalesFrom(year);
    if (!response) return;
    SwalToast("Se actualizaron facturas");
    getSales(year);
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
    <div className="container-fluid">
      <div className="d-flex gap-2 mb-3 flex-wrap justify-content-center">
        <span className="input-group-text">VENTAS</span>
        <select
          value={year}
          name="year"
          id="year"
          className="input-group-text"
          onChange={handleYear}
        >
          {yearsAvailable.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <span className="input-group-text bg-info">{sales.length} ventas</span>
        <button onClick={updateSalesCurrentYear} className="btn btn-success">
          ACTUALIZAR
        </button>
      </div>
      <div className="d-flex gap-2 mb-3">
        <span className="input-group-text">A LIBERAR</span>
        <span className="input-group-text bg-warning">
          $ {formatPrice(getSalesToFreeTotal(sales))}
        </span>
      </div>

      {sales.length > 0 && <SalesList sales={sales} />}
    </div>
  );
}
