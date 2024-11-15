import { Link } from "react-router-dom";
import moment from "moment";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
import { getReplacements } from "../../utils/data";
import Table from "../../components/TableReplacements/Table";

export default function Replacements() {
  const { user } = useContext(UserContext);
  const [replacements, setReplacements] = useState([]);
  const [sortData, setSortData] = useState({
    name: "fecha",
    code: "createdAt",
    sort: true,
  });

  const getData = async () => {
    const data = await getReplacements();

    setReplacements(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { name: "#", code: "position", sort: false },
    { name: "fecha", code: "createdAt", sort: true },
    { name: "orden", code: "orderNumber", sort: false },
    { name: "tecnico", code: "technical_code", sort: false },
    { name: "descripcion", code: "description", sort: false },
    { name: "prov.", code: "supplier", sort: false },
    { name: "costo", code: "cost", sort: false },
    { name: "precio", code: "finalPrice", sort: false },
    { name: "demora", code: "delay", sort: false },
    { name: "envio", code: "shipmment", sort: false },
    { name: "confirmacion", code: "customerConfirmation", sort: false },
    { name: "estado", code: "status", sort: false },
    { name: "link", code: "linkSupplier", sort: false },
  ];

  const sortDataBy = (column) => {
    function compareDates(a, b) {
      if (a[column.code] < b[column.code]) {
        return sortData.sort ? -1 : 1;
      }
      if (a[column.code] > b[column.code]) {
        return sortData.sort ? 1 : -1;
      }
      return 0;
    }
    setReplacements((prev) => prev.sort(compareDates));

    setSortData((prev) => ({ ...column, sort: !prev.sort }));
  };

  return (
    <div className="container-fluid">
      <div className="row gap-3">
        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-success">Agregar</button>
        </div>

        <div className="col">
          <div className="row">
            {replacements && (
              <Table
                columns={columns}
                data={replacements}
                sortDataBy={sortDataBy}
                sortData={sortData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
