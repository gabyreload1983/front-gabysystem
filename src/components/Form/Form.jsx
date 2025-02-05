import { capitalize } from "../../utils/tools";

function getInputType(value) {
  if (typeof value === "number") {
    return "number";
  } else if (typeof value === "boolean") {
    return "checkbox";
  } else {
    return "text";
  }
}

export default function Form({
  inputs,
  onHandleChange,
  onHandleSubmit,
  textButton = "Aceptar",
}) {
  return (
    <form className="row bg-dark p-3" onSubmit={onHandleSubmit}>
      {inputs &&
        inputs.map((item) => (
          <div className="col-12 col-lg-6" key={item.code}>
            <div className="form-floating mb-3">
              <input
                className="form-control form-control-sm"
                id={item.code}
                type={getInputType(item.value)}
                placeholder={item.code}
                name={item.code}
                required={item.required}
                value={item.value}
                onChange={onHandleChange}
              />
              <label htmlFor={item.code}>{capitalize(item.name)}</label>
            </div>
          </div>
        ))}
      <div className="col-12">
        <button className="btn btn-success w-100">{textButton}</button>
      </div>
    </form>
  );
}
