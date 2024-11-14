import { Link } from "react-router-dom";
import moment from "moment";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
import { getReplacements } from "../../utils/data";

export default function Replacements() {
  const { user } = useContext(UserContext);
  const [replacements, setReplacements] = useState([]);

  const getData = async () => {
    const data = await getReplacements();
    setReplacements(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-sm">
        <thead>
          <tr className="table-light">
            <th>#</th>
            <th className="d-none d-lg-table-cell">Nro ORDEN</th>
            <th className="d-none d-md-table-cell">TECNICO</th>
            <th className="d-none d-lg-table-cell">DESCRIPCION</th>
            <th className="d-none d-lg-table-cell">IMAGENES</th>
            <th className="d-none d-lg-table-cell">CODIGO PROV</th>
            <th className="d-none d-lg-table-cell">PROVEEDOR</th>
            <th className="d-none d-lg-table-cell">COSTO</th>
            <th className="d-none d-lg-table-cell">PRECIO FINAL</th>
            <th className="d-none d-lg-table-cell">DEMORA</th>
            <th className="d-none d-lg-table-cell">ENVIO</th>
            <th className="d-none d-lg-table-cell">CONFIRMACION PROV</th>
            <th className="d-none d-lg-table-cell">ESTADO</th>
            <th className="d-none d-lg-table-cell">LINK</th>
            <th className="d-none d-lg-table-cell">NOTAS</th>
          </tr>
        </thead>
        <tbody>
          {replacements.length > 0 &&
            replacements.map((replacement, index) => {
              return (
                <tr key={`${replacement._id}`}>
                  <td>{index + 1}</td>
                  <td className="d-none d-lg-table-cell">
                    {replacement.orderNumber}
                  </td>
                  <td className="d-none d-lg-table-cell">
                    {replacement.technical_code}
                  </td>
                  <td className="d-none d-lg-table-cell">
                    {replacement.description}
                  </td>
                  <td className="d-none d-lg-table-cell custom-td">
                    {replacement.images}
                  </td>
                  <td className="d-none d-lg-table-cell">
                    {replacement.supplier_code}
                  </td>
                  <td className="d-none d-lg-table-cell">
                    {replacement.supplier}
                  </td>
                  <td className="d-none d-lg-table-cell">{replacement.cost}</td>
                  <td className="d-none d-lg-table-cell">
                    {replacement.finalPrice}
                  </td>
                  <td className="d-none d-lg-table-cell">
                    {replacement.delay}
                  </td>
                  <td className="d-none d-lg-table-cell">
                    {replacement.shipmment}
                  </td>
                  <td className="d-none d-lg-table-cell">
                    {replacement.customerConfirmation
                      ? "Confirmed"
                      : "Not Confirmed"}
                  </td>
                  <td className="d-none d-lg-table-cell">
                    {replacement.status}
                  </td>
                  <td className="d-none d-lg-table-cell">
                    <a
                      href={replacement.linkSupplier}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Supplier Link
                    </a>
                  </td>
                  <td className="d-none d-lg-table-cell">
                    {replacement.notes || "No notes available"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
