import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { SwalError, getFromApi, validateStatus } from "../../utils";
import StatisticsTable from "./StatisticsTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { BarLoader } from "react-spinners";

export default function Statistics() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [from, setFrom] = useState(
    searchParams.get("from") || moment().format("YYYY-MM-DD")
  );
  const [to, setTo] = useState(
    searchParams.get("to") || moment().format("YYYY-MM-DD")
  );
  const [statistics, setStatistics] = useState([]);
  const navigate = useNavigate();
  const { logoutUserContext } = useContext(UserContext);
  const [loader, setLoader] = useState(false);

  const handleFrom = (event) => {
    const { value } = event.target;
    setFrom(value);
  };
  const handleTo = (event) => {
    const { value } = event.target;
    setTo(value);
  };

  const getStaticts = async () => {
    try {
      setLoader(true);

      const response = await getFromApi(
        `http://${
          import.meta.env.VITE_URL_HOST
        }/api/orders/statitstics/${from}/${to}`
      );

      if (validateStatus(response) === "jwt-expired") navigate("login");

      if (response.status === "success") {
        setLoader(false);
        setStatistics(response.payload);
      }
    } catch (error) {
      SwalError(error);
    }
  };

  useEffect(() => {
    getStaticts();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">Estadisticas</h2>
      <div className="row">
        <div className="col-12">
          <div className="row mb-3 text-center">
            <div className="col-12 col-md-4">
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
            <div className="col-12 col-md-4">
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
            <div className="col-12 col-md-4">
              <button onClick={getStaticts} className="btn btn-info">
                Aceptar
              </button>
            </div>
            <div className="col-12 my-3">
              {loader && (
                <BarLoader color="#36d7b7" cssOverride={{ width: "100%" }} />
              )}
            </div>
          </div>
        </div>
        <div className="col-12 mt-3">
          <StatisticsTable statistics={statistics} />
        </div>
      </div>
    </div>
  );
}
