import { tiers } from "../../../constants";

export default function FormCreateServiceWork({ customer, onHandleSubmit }) {
  return (
    <form onSubmit={onHandleSubmit} className="d-flex flex-column gap-3">
      <input
        readOnly
        type="text"
        value={`${customer?.codigo} - ${customer?.nombre}`}
        className="form-control text-center bg-success"
      />
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

      <div>
        <label htmlFor="falla">Falla</label>
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
      <div className="form-floating ">
        <select
          id="prioridad"
          name="prioridad"
          className="form-select"
          aria-label="Default select example"
        >
          {tiers.map((tier, index) => (
            <option key={index} value={index}>
              {tier}
            </option>
          ))}
        </select>
        <label htmlFor="prioridad">Prioridad</label>
      </div>
      <button className="btn btn-success">Crear</button>
    </form>
  );
}
