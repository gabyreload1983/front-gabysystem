import { useState } from "react";
import Form from "../../../components/Form/Form";
import { AddNewReplacement } from "../../../utils/data";
import { SwalToast } from "../../../utils/alerts";
import { NavLink } from "react-router-dom";
import { replacementInputs } from "../../../constants";

export default function AddReplacement() {
  const [inputs, setInputs] = useState(replacementInputs);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.code === name ? { ...input, value } : input
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const newReplacement = {};
    for (const [key, value] of form) {
      newReplacement[key] = value;
    }

    const res = await AddNewReplacement(newReplacement);
    if (res) {
      SwalToast("Se agrego repuesto", 800);
      setInputs([...replacementInputs]);
    }
  };

  return (
    <div className="container p-2">
      <NavLink className="btn btn-info" to="/replacements/list">
        Volver
      </NavLink>
      <h2 className="text-center">Agregar Repuesto</h2>
      <Form
        inputs={inputs}
        onHandleChange={handleChange}
        onHandleSubmit={handleSubmit}
        textButton="Agregar"
      />
    </div>
  );
}
