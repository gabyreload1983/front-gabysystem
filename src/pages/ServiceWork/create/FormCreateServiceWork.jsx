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
        id="sector"
        name="sector"
        className="form-select"
        aria-label="Default select example"
        required
      >
        <option value="">Sector</option>
        <option value=".PC">PC</option>
        <option value=".IMP">Impresoras</option>
      </select>
      <div className="form-floating ">
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          placeholder="Descripcion Articulo"
          required
        />
        <label htmlFor="description">Descripcion Articulo</label>
      </div>
      <div className="form-floating ">
        <input
          type="text"
          className="form-control"
          id="accesories"
          name="accesories"
          placeholder="Accesorios"
          required
        />
        <label htmlFor="accesories">Accesorios</label>
      </div>

      <div>
        <label htmlFor="fail" className="text-white">
          Falla
        </label>
        <textarea id="fail" name="fail" placeholder="Falla" required></textarea>
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
          id="priority"
          name="priority"
          className="form-select"
          aria-label="Default select example"
          required
        >
          {tiers.map((tier, index) => (
            <option key={index} value={index}>
              {tier}
            </option>
          ))}
        </select>
        <label htmlFor="priority">Prioridad</label>
      </div>
      <button className="btn btn-success">Crear</button>
    </form>
  );
}
