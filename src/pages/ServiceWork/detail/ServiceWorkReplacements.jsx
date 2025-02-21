import { PencilIcon } from "@heroicons/react/16/solid";
import {
  formatDate,
  formatPrice,
  getTotalReplacements,
} from "../../../utils/tools";

export default function ServiceWorkReplacements({ replacements }) {
  const handleEdit = async () => {};
  console.log(replacements);

  return (
    <div className="table-responsive">
      <h2>Repuestos</h2>
      {replacements && (
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Descripcion</th>
              <th>Precio Cliente</th>
              <th className="d-none d-md-table-cell">Estado</th>
              <th className="d-none d-md-table-cell">Llega dia</th>
              <th className="d-none d-md-table-cell">Confirmo Cliente</th>
              <td>Editar</td>
            </tr>
          </thead>
          <tbody>
            {replacements.map((replacement) => {
              return (
                <tr key={replacement._id}>
                  <td>{replacement.description}</td>
                  <td className="custom-td text-end">
                    ${formatPrice(replacement.finalPrice)}
                  </td>
                  <td className="d-none d-md-table-cell">
                    {replacement.status}
                  </td>
                  <td className="d-none d-md-table-cell">
                    {formatDate(replacement.deliveryDate)}
                  </td>
                  <td className="d-none d-lg-table-cell">
                    {replacement.customerConfirmation ? "SI" : "NO"}
                  </td>
                  <td>
                    <PencilIcon
                      onClick={() => handleEdit(replacement._id)}
                      className="iconTable cursor-pointer"
                    />{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="d-none d-lg-table-cell">
              <td className="text-start" colSpan={5}>
                Total
              </td>
              <td className="custom-td text-end bg-primary">
                ${getTotalReplacements(replacements)}
              </td>
            </tr>
          </tfoot>
        </table>
      )}
      <button className="btn btn-sm btn-success">Pedir Repuesto</button>
    </div>
  );
}
