import { capitalize } from "../../utils/tools";

export default function Form({ inputs, onHandleSubmit }) {
  return (
    <form className="row bg-dark p-3" onSubmit={onHandleSubmit}>
      {inputs &&
        inputs.map((item) => (
          <div className="col-12 col-lg-6" key={item.code}>
            <div className="form-floating mb-3">
              <input
                className="form-control form-control-sm"
                id={item.code}
                type="text"
                placeholder={item.code}
                name={item.code}
                required={item.required}
              />
              <label htmlFor={item.code}>{capitalize(item.name)}</label>
            </div>
          </div>
        ))}
      <button className="btn btn-success">Agregar</button>
    </form>
  );
}
