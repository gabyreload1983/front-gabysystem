import moment from "moment";
import React, { useContext, useState } from "react";
import { SwalError, getFromApi } from "../../utils";
import StatisticsDetail from "./StatisticsDetail";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export default function Statistics() {
  const [from, setFrom] = useState(moment().format("YYYY-MM-DD"));
  const [to, setTo] = useState(moment().format("YYYY-MM-DD"));
  const [statistics, setStatistics] = useState([]);

  const navigate = useNavigate();
  const { logoutUserContext } = useContext(UserContext);

  const handleFrom = (event) => {
    const { value } = event.target;
    setFrom(value);
  };
  const handleTo = (event) => {
    const { value } = event.target;
    setTo(value);
  };

  const getStaticts = async () => {
    const response = await getFromApi(
      `http://${
        import.meta.env.VITE_URL_HOST
      }/api/orders/statitstics/${from}/${to}`
    );

    if (response.status === "error" && response.message === "jwt-expired") {
      await SwalError(response);
      logoutUserContext();
      return navigate("/login");
    }
    if (response.status === "error") return await SwalError(response);

    if (response.status === "success") {
      setStatistics(response.payload);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Estadisticas</h2>
      <div className="row">
        <div className="col-12">
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="from">Desde</label>
              <input
                className="ms-3"
                type="date"
                name="from"
                id="from"
                required
                value={from}
                onChange={handleFrom}
              />
            </div>
            <div className="col">
              <label htmlFor="to">Hasta</label>
              <input
                className="ms-3"
                type="date"
                name="to"
                id="to"
                required
                value={to}
                onChange={handleTo}
              />
            </div>
            <div className="col">
              <button onClick={getStaticts} className="btn btn-info">
                Aceptar
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 mt-3">
          <StatisticsDetail statistics={statistics} />
        </div>
      </div>
    </div>
  );
}
