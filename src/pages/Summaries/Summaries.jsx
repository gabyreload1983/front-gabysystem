import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { validateStatus } from "../../utils";
import { BarLoader } from "react-spinners";
import TableSummaries from "../../components/TableSummaries/TableSummaries";
import { API_URL } from "../../constants";
import { SwalError } from "../../utils/alerts";
import { getFromApi } from "../../utils/api";

export default function Summaries() {
  const navigate = useNavigate();
  const { logoutUserContext } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [sortData, setSortData] = useState({
    name: "saldo",
    code: "balance",
    sort: true,
  });

  const getSummaries = async () => {
    try {
      setLoader(true);
      setCustomers([]);
      const response = await getFromApi(`${API_URL}/api/customers/summaries`);
      setLoader(false);

      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

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
          <button onClick={getSummaries} className="btn btn-outline-info">
            Listar Deudores
          </button>
        </div>
      </div>
      {loader && <BarLoader color="#36d7b7" cssOverride={{ width: "100%" }} />}

      <TableSummaries
        columns={columns}
        data={customers}
        sortDataBy={sortDataBy}
        sortData={sortData}
      />
    </div>
  );
}
