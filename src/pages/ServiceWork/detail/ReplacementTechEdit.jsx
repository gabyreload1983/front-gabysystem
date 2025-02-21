import { useEffect, useState } from "react";
import { getReplacement } from "../../../utils/data";
import { useParams } from "react-router-dom";
import UploadImagesReplacement from "./UploadImagesReplacement";

export default function ReplacementTechEdit() {
  const { id } = useParams();
  const [replacement, setReplacement] = useState(null);

  const handleSubmit = async () => {};
  const getData = async () => {
    const dataReplacement = await getReplacement(id);
    setReplacement(dataReplacement);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container">
        {replacement && (
          <form className="row bg-dark p-3" onSubmit={handleSubmit}>
            <div className="col-12">
              <div className="form-floating mb-3">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="description"
                  defaultValue={replacement.description}
                  required
                />
                <label htmlFor="description">Descripcion</label>
              </div>
            </div>

            <div className="col-12">
              <div className="form-floating mb-3">
                <select
                  name="customerConfirmation"
                  className="form-select form-select-sm mb-3"
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
                  defaultValue={replacement.notes}
                />
                <label htmlFor="notes">Notas</label>
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-success w-100">Actualizar</button>
            </div>
          </form>
        )}
        <div className="row">
          <div className="col">
            {replacement && (
              <UploadImagesReplacement replacement={replacement} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
