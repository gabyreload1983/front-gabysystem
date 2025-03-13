import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { BarLoader } from "react-spinners";
import TableSummaries from "../../components/TableSummaries/TableSummaries";
import { API_URL } from "../../constants";
import { SwalError } from "../../utils/alerts";
import { getFromApi } from "../../utils/api";
import LoadingOverlay from "../../components/LoadingOverlay";
import { getSummariesCurrentAccont30 } from "../../utils/data";

export default function Summaries() {
  const navigate = useNavigate();
  const { logoutUserContext } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [sortData, setSortData] = useState({
    name: "saldo",
    code: "balance",
    sort: true,
  });

  const getSummaries = async () => {
    try {
      setLoading(true);
      setCustomers([]);
      const response = await getFromApi(`${API_URL}/api/customers/summaries`);
      setLoading(false);

      const customersFilter = ["000363", "855914", ".CF", "5021", "8600"];

      if (response.status === "success") {
        const filterSummaries = response.payload.filter((summarie) =>
          customersFilter.every((code) => code !== summarie.codigo)
        );
        setCustomers(filterSummaries);
      }
    } catch (error) {
      SwalError(error?.message);
    }
  };

  const handleSummariesCurrentAccont30 = async () => {
    try {
      setLoading(true);
      setCustomers([]);
      const response = await getSummariesCurrentAccont30();
      setLoading(false);
      setCustomers(response);
    } catch (error) {
      SwalError(error?.message);
    }
  };

  const columns = [
    { name: "codigo", code: "codigo" },
    { name: "cliente", code: "nombre" },
    { name: "saldo", code: "balance" },
    { name: "ultimo pago", code: "lastPay" },
    { name: "tipo cuenta", code: "condicion" },
    { name: "email", code: "mail" },
  ];

  const sortDataBy = (column) => {
    if (column.code === "balance") {
      setCustomers((prevCustomers) =>
        prevCustomers.sort((a, b) =>
          sortData.sort ? a.balance - b.balance : b.balance - a.balance
        )
      );
    }

    if (column.code !== "balance") {
      function compareDates(a, b) {
        if (a[column.code] < b[column.code]) {
          return sortData.sort ? -1 : 1;
        }
        if (a[column.code] > b[column.code]) {
          return sortData.sort ? 1 : -1;
        }
        return 0;
      }
      setCustomers((prevCustomers) => prevCustomers.sort(compareDates));
    }

    setSortData((prev) => ({ ...column, sort: !prev.sort }));
  };

  return (
    <div className="container">
      <div className="row my-3">
        <div className="col d-flex justify-content-between">
          <span className="fs-3">CANTIDAD: {customers.length}</span>
          <div className="d-flex gap-2">
            <button
              onClick={handleSummariesCurrentAccont30}
              className="btn btn-outline-info"
            >
              Listar CTA CTE 30
            </button>
            <button onClick={getSummaries} className="btn btn-outline-warning">
              Listar Deudores
            </button>
          </div>
        </div>
      </div>
      {<LoadingOverlay loading={loading} />}

      <TableSummaries
        columns={columns}
        data={customers}
        sortDataBy={sortDataBy}
        sortData={sortData}
      />
    </div>
  );
}
