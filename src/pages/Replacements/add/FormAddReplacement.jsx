export default function FormAddReplacement({ onHandleSubmit }) {
  return (
    <form className="row bg-dark p-3" onSubmit={onHandleSubmit}>
      <div className="col-12 col-lg-4">
        <div className="form-floating mb-3">
          <input
            className="form-control form-control-sm"
            type="text"
            name="requests"
            defaultValue=""
            required
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
            defaultValue=""
            required
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue={0}
            min={0}
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
            defaultValue={0}
            min={0}
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
          />
          <label htmlFor="deliveryDate">Llega dia</label>
        </div>
      </div>

      <div className="col-12 col-lg-4">
        <div className="form-floating mb-3">
          <select
            name="customerConfirmation"
            className="form-select form-select-sm mb-3"
          >
            <option value="no">NO</option>
            <option value="yes">SI</option>
          </select>
          <label htmlFor="customerConfirmation">Confirmacion Cliente</label>
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
            defaultValue=""
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
            defaultValue=""
          />
          <label htmlFor="notes">Notas</label>
        </div>
      </div>
      <div className="col-12 col-lg-4">
        <button className="btn btn-success w-100">Agregar</button>
      </div>
    </form>
  );
}
