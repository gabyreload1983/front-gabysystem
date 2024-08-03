import moment from "moment";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { getFromApi, validateStatus } from "../../../utils";
import { BarLoader } from "react-spinners";
import StatisticsTable from "./StatisticsTable";
import { API_URL } from "../../../constants";
import { SwalError } from "../../../utils/alerts";

export default function StatisticsTechnicals() {
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
        `${API_URL}/api/orders/statitstics/${from}/${to}`
      );

      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

      if (response.status === "success") {
        setLoader(false);
        setStatistics(response.payload);
      }
    } catch (error) {
      SwalError(error?.message);
    }
  };

  useEffect(() => {
    getStaticts();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">Estadisticas</h2>
      <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
        <div className="d-flex justify-content-center align-items-center">
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
        <div className="d-flex justify-content-center align-items-center">
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
        <div className="d-flex justify-content-center">
          <button onClick={getStaticts} className="btn btn-info">
            Aceptar
          </button>
        </div>
      </div>
      <div className="col-12 my-3">
        {loader && (
          <BarLoader color="#36d7b7" cssOverride={{ width: "100%" }} />
        )}
      </div>
      <StatisticsTable statistics={statistics} />
    </div>
  );
}
