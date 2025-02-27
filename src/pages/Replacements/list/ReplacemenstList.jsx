import { NavLink } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { useContext, useEffect, useState } from "react";
import { getReplacements } from "../../../utils/data";
import Table from "../../../components/TableReplacements/Table";
import { sortArrayBy } from "../../../utils/tools";

export default function ReplacemenstList() {
  const { user } = useContext(UserContext);
  const [replacements, setReplacements] = useState([]);
  const [sortData, setSortData] = useState({
    name: "fecha",
    code: "createdAt",
    sort: true,
  });

  const getData = async () => {
    const data = await getReplacements();

    setReplacements(sortArrayBy(data, sortData.code, sortData.sort));
  };

  const getReplacementsArchived = async () => {
    const data = await getReplacements(true);

    setReplacements(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { name: "#", code: "position", sort: false },
    { name: "fecha", code: "createdAt", sort: true },
    { name: "orden", code: "orderNumber", sort: false },
    { name: "solicito", code: "requests", sort: false },
    { name: "descripcion", code: "description", sort: false },
    { name: "prov.", code: "supplier", sort: false },
    { name: "costo", code: "cost", sort: false },
    { name: "precio f.", code: "finalPrice", sort: false },
    { name: "confirmacion", code: "customerConfirmation", sort: false },
    { name: "estado", code: "status", sort: false },
    { name: "Llega", code: "deliveryDate", sort: true },
    { name: "link", code: "linkSupplier", sort: false },
    { name: "editar", code: "edit", sort: false },
  ];

  const sortDataBy = (column) => {
    setReplacements(sortArrayBy(replacements, column, !sortData.sort));

    setSortData((prev) => ({ ...prev, sort: !prev.sort }));
  };

  return (
    <div className="row gap-3">
      <div className="d-flex justify-content-end gap-2 mt-3">
        <button className="btn btn-info" onClick={getData}>
          Pendientes
        </button>
        <button className="btn btn-warning" onClick={getReplacementsArchived}>
          Archivados
        </button>
        <NavLink className="btn btn-success" to="/replacements/add">
          Agregar
        </NavLink>
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
  );
}
