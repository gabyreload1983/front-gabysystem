import { useEffect, useState } from "react";
import { getReplacement, updateReplacement } from "../../../utils/data";
import { NavLink, useParams } from "react-router-dom";
import UploadImagesReplacement from "./UploadImagesReplacement";
import { SwalError, SwalSuccess, SwalToast } from "../../../utils/alerts";
import ReplacementImages from "../../Replacements/edit/ReplacementImages";
import { API_URL } from "../../../constants";

export default function ReplacementTechEdit() {
  const { sid, rid } = useParams();
  const [replacement, setReplacement] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await updateReplacement(rid, replacement);
    if (!response) return;
    SwalToast("Se actualizo repuesto!");
    getData();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReplacement((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const getData = async () => {
    const dataReplacement = await getReplacement(rid);
    setReplacement(dataReplacement);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container">
        <NavLink
          className="btn btn-info mb-2"
          to={`/servicework/detail/${sid}`}
        >
          Volver
        </NavLink>
        {replacement && (
          <form className="row bg-dark p-3" onSubmit={handleSubmit}>
            <div className="col-12">
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

            <div className="col-12">
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

            <div className="col-12">
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
            <div className="col-12">
              <button className="btn btn-success w-100">Actualizar</button>
            </div>
          </form>
        )}
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
    </>
  );
}
