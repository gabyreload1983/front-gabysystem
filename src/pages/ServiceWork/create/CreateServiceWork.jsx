import { useState } from "react";
import { tiers } from "../../../constants";
import SearchCustomer from "../../../components/Customers/SearchCustomer";

export default function CreateServiceWork() {
  const [serviceWork, setServiceWork] = useState({
    codigo: "",
    nombre: "",
    telefono: "",
    codiart: "",
    descart: "",
    serie: "",
    operador: "",
    falla: "",
    accesorios: "",
    prioridad: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const newServiceWork = { ...serviceWork };
    for (const [key, value] of form) {
      newServiceWork[key] = value;
    }
    setServiceWork(newServiceWork);
    console.log(newServiceWork);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-6">
          <SearchCustomer />
        </div>
        <div className="col-12 col-md-6">
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <select
              id="codiart"
              name="codiart"
              className="form-select"
              aria-label="Default select example"
            >
              <option defaultValue>Sector</option>
              <option value="pc">PC</option>
              <option value="printer">Impresoras</option>
            </select>
            <div className="form-floating ">
              <input
                type="text"
                className="form-control"
                id="descart"
                name="descart"
                placeholder="descart"
              />
              <label htmlFor="descart">Descripcion</label>
            </div>
            <div className="form-floating ">
              <input
                type="text"
                className="form-control"
                id="accesorios"
                name="accesorios"
                placeholder="Accesorios"
              />
              <label htmlFor="accesorios">Accesorios</label>
            </div>

            <div className="form-floating">
              <textarea id="falla" name="falla" placeholder="Falla"></textarea>
            </div>

            <div className="form-floating ">
              <input
                type="text"
                className="form-control"
                id="serie"
                name="serie"
                placeholder="Serie"
              />
              <label htmlFor="serie">Serie</label>
            </div>
            <select
              id="prioridad"
              name="prioridad"
              className="form-select"
              aria-label="Default select example"
            >
              <option defaultValue>prioridad</option>
              {tiers.map((tier, index) => (
                <option key={index} value={index}>
                  {tier}
                </option>
              ))}
            </select>
            <button className="btn btn-success">Crear</button>
          </form>
        </div>
      </div>
    </div>
  );
}
