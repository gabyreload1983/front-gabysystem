import { PencilIcon } from "@heroicons/react/16/solid";
import {
  formatDate,
  formatPrice,
  getTotalReplacements,
} from "../../../utils/tools";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ServiceWorkReplacements({
  replacements,
  onHandleAddReplacement,
}) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleEdit = async (id) => {
    navigate(`/servicework/replacement/edit/${id}`);
  };
  const handleRequestReplacement = async () => {
    const description = document.getElementById("description").value;
    await onHandleAddReplacement(description);
    setShow(false);
  };

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

      <button
        type="button"
        className="btn btn-sm btn-success"
        onClick={() => setShow(true)}
      >
        Pedir Repuesto
      </button>

      {show && (
        <div
          className="text-black modal fade show d-block"
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Pedir Repuesto</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShow(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    REPUESTO
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShow(false)}
                >
                  Cerrar
                </button>
                <button
                  onClick={handleRequestReplacement}
                  type="button"
                  className="btn btn-primary"
                >
                  Solicitar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
