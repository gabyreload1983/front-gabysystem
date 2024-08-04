import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { tiers } from "../../../constants";
import { NavLink } from "react-router-dom";
import {
  formatNameSector,
  getOrderTier,
  getOrderTierBackground,
} from "../../../utils/tools";

export default function FormEditServiceWork({
  nrocompro,
  onHandleSubmit,
  serviceWork,
}) {
  return (
    <form onSubmit={onHandleSubmit} className="d-flex flex-column gap-3">
      <h2
        className={`${getOrderTierBackground(
          serviceWork.prioridad
        )} text-center rounded-2 m-0`}
      >
        {nrocompro}
      </h2>
      <div className="d-flex bg-success justify-content-center align-items-center gap-3 py-1 rounded-2 ">
        <span className="fs-4">{`${serviceWork?.codigo} - ${serviceWork?.nombre}`}</span>
        <NavLink to={`/servicework/edit/${nrocompro}/customer`}>
          <PencilSquareIcon className="icon" />
        </NavLink>
      </div>
      <select
        id="codiart"
        name="codiart"
        className="form-select"
        aria-label="Default select example"
        required
      >
        <option value={serviceWork.codiart}>
          {formatNameSector({ sector: serviceWork.codiart })}
        </option>
        <option value=".PC">PC</option>
        <option value=".IMP">Impresoras</option>
      </select>
      <div className="form-floating ">
        <input
          type="text"
          className="form-control"
          id="descart"
          name="descart"
          placeholder="Descripcion Articulo"
          required
          defaultValue={serviceWork.descart}
        />
        <label htmlFor="descart">Descripcion Articulo</label>
      </div>
      <div className="form-floating ">
        <input
          type="text"
          className="form-control"
          id="accesorios"
          name="accesorios"
          placeholder="Accesorios"
          required
          defaultValue={serviceWork.accesorios}
        />
        <label htmlFor="accesorios">Accesorios</label>
      </div>

      <div>
        <label htmlFor="fail" className="text-white">
          Falla
        </label>
        <textarea
          id="falla"
          name="falla"
          placeholder="Falla"
          required
          defaultValue={serviceWork.falla}
        ></textarea>
      </div>

      <div className="form-floating ">
        <input
          type="text"
          className="form-control"
          id="serie"
          name="serie"
          placeholder="Serie"
          defaultValue={serviceWork.serie}
        />
        <label htmlFor="serie">Serie</label>
      </div>
      <div className="form-floating ">
        <select
          id="prioridad"
          name="prioridad"
          className="form-select"
          aria-label="Default select example"
          required
        >
          <option value={serviceWork.prioridad}>
            {getOrderTier(serviceWork.prioridad)}
          </option>
          {tiers.map((tier, index) => (
            <option key={index} value={index}>
              {tier}
            </option>
          ))}
        </select>
        <label htmlFor="prioridad">Prioridad</label>
      </div>
      <button className="btn btn-warning">Actualizar</button>
    </form>
  );
}
