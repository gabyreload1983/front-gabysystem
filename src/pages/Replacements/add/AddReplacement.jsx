import { addNewReplacement } from "../../../utils/data";
import { SwalToast } from "../../../utils/alerts";
import { NavLink } from "react-router-dom";
import FormAddReplacement from "./FormAddReplacement";

export default function AddReplacement() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const newReplacement = {};
    for (const [key, value] of form) {
      newReplacement[key] = value;
    }

    newReplacement["customerConfirmation"] =
      newReplacement["customerConfirmation"] === "yes";

    const res = await addNewReplacement(newReplacement);
    if (res) {
      SwalToast("Se agrego repuesto", 800);
      form.reset;
    }
  };

  return (
    <div className="container p-2">
      <NavLink className="btn btn-info" to="/replacements/list">
        Volver
      </NavLink>
      <h2 className="text-center">Agregar Repuesto</h2>
      <FormAddReplacement onHandleSubmit={handleSubmit} />
    </div>
  );
}
