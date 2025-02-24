import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteReplacement,
  getReplacement,
  updateReplacement,
} from "../../../utils/data";
import {
  SwalActionConfirmWithText,
  SwalError,
  SwalSuccess,
  SwalToast,
} from "../../../utils/alerts";
import { formatDateForInput } from "../../../utils/tools";
import ReplacementImages from "./ReplacementImages";
import UploadImagesReplacement from "../../ServiceWork/detail/UploadImagesReplacement";
import { API_URL } from "../../../constants";

export default function EditReplacement() {
  const { id } = useParams();
  const [replacement, setReplacement] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    const data = await getReplacement(id);

    setReplacement(data);
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setReplacement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const replacementUpdated = {};
    for (const [key, value] of form) {
      replacementUpdated[key] = value;
    }
    await updateReplacement(id, replacementUpdated);
    await SwalToast("Se actualizo repuesto!!!", 800);
  };

  const handleDelete = async (id) => {
    const res = await SwalActionConfirmWithText(
      "borrar",
      "Seguro que queres borrar este repuesto???",
      "Para confirmar ingresa: borrar"
    );
    if (res) {
      const response = await deleteReplacement(id);
      await SwalToast(`Se borro el repuesto!!!`, 800);
      navigate("/replacements/list");
    }
  };
  const handleUpload = async (formData) => {
    const response = await fetch(
      `${API_URL}/api/replacements/images/${replacement._id}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response) return SwalError("Error subiendo fotos");

    await SwalSuccess("Se subieron las fotos con exito!!");
    getData();
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="container p-2">
      <div className="d-flex justify-content-between">
        <NavLink className="btn btn-info" to="/replacements/list">
          Volver
        </NavLink>
        <button onClick={() => handleDelete(id)} className="btn btn-danger">
          Borrar
        </button>
      </div>
      <div className="col-12 mb-5">
        <h2 className="text-center">Actualizar</h2>
        {replacement && (
          <form className="row bg-dark p-3" onSubmit={handleSubmit}>
            <div className="col-12 col-lg-4">
              <div className="form-floating mb-3">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="requests"
                  value={replacement.requests}
                  required
                  onChange={handleChange}
                />
                <label htmlFor="requests">Solicita</label>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-floating mb-3">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="description"
                  value={replacement.description}
                  required
                  onChange={handleChange}
                />
                <label htmlFor="description">Descripcion</label>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-floating mb-3">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="orderNumber"
                  value={replacement.orderNumber}
                  onChange={handleChange}
                />
                <label htmlFor="orderNumber">Orden</label>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-floating mb-3">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="supplier"
                  value={replacement.supplier}
                  onChange={handleChange}
                />
                <label htmlFor="supplier">Proveedor</label>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-floating mb-3">
                <input
                  className="form-control form-control-sm"
                  type="number"
                  name="cost"
                  value={replacement.cost}
                  min={0}
                  onChange={handleChange}
                />
                <label htmlFor="cost">Costo</label>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-floating mb-3">
                <input
                  className="form-control form-control-sm"
                  type="number"
                  name="finalPrice"
                  value={replacement.finalPrice}
                  min={0}
                  onChange={handleChange}
                />
                <label htmlFor="finalPrice">Precio Final</label>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-floating mb-3">
                <input
                  className="form-control form-control-sm"
                  type="date"
                  name="deliveryDate"
                  value={formatDateForInput(replacement.deliveryDate)}
                  onChange={handleChange}
                />
                <label htmlFor="deliveryDate">Llega dia</label>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="form-floating mb-3">
                <select
                  name="customerConfirmation"
                  className="form-select form-select-sm mb-3"
                  onChange={handleChange}
                >
                  {replacement.customerConfirmation ? (
                    <>
                      <option value="yes">SI</option>
                      <option value="no">NO</option>
                    </>
                  ) : (
                    <>
                      <option value="no">NO</option>
                      <option value="yes">SI</option>
                    </>
                  )}
                </select>
                <label htmlFor="customerConfirmation">
                  Confirmacion Cliente
                </label>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-floating mb-3">
                <datalist id="status">
                  <option value="pendiente"></option>
                  <option value="en camino"></option>
                  <option value="entregado"></option>
                  <option value="con problemas"></option>
                  <option value="proveedor con demora"></option>
                  <option value="entregado taller"></option>
                  <option value="no se consigue"></option>
                </datalist>
                <input
                  className="form-control form-control-sm"
                  list="status"
                  name="status"
                  onChange={handleChange}
                  value={replacement.status}
                />

                <label htmlFor="status">Estado</label>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-floating mb-3">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="linkSupplier"
                  value={replacement.linkSupplier}
                  onChange={handleChange}
                />
                <label htmlFor="linkSupplier">Link</label>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-floating mb-3">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="notes"
                  value={replacement.notes}
                  onChange={handleChange}
                />
                <label htmlFor="notes">Notas</label>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <button className="btn btn-success w-100">Actualizar</button>
            </div>
          </form>
        )}
      </div>
      <div className="row mt-3">
        {replacement && (
          <>
            <div className="col-12 col-md-6">
              <UploadImagesReplacement onHandleUpload={handleUpload} />
            </div>
            <div className="col-12">
              <ReplacementImages replacement={replacement} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
