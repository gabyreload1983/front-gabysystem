import { NavLink, useNavigate, useParams } from "react-router-dom";
import Form from "../../../components/Form/Form";
import { useEffect, useState } from "react";
import {
  deleteReplacement,
  getReplacement,
  updateReplacement,
} from "../../../utils/data";
import { replacementInputsEdit } from "../../../constants";
import { SwalActionConfirmWithText, SwalToast } from "../../../utils/alerts";

export default function EditReplacement() {
  const { id } = useParams();
  const [replacement, setReplacement] = useState(replacementInputsEdit);
  const navigate = useNavigate();

  const getData = async () => {
    const data = await getReplacement(id);

    setReplacement(
      replacementInputsEdit.map((item) => {
        item.value = data[item.code];
        return item;
      })
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setReplacement((prevInputs) =>
      prevInputs.map((input) =>
        input.code === name ? { ...input, value } : input
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const replacementUpdated = {};
    for (const [key, value] of form) {
      replacementUpdated[key] = value;
    }
    await updateReplacement(id, replacementUpdated);
    await SwalToast("Se actualizo repuesto!!!", 800);
  };

  const handleDelete = async (id) => {
    const res = await SwalActionConfirmWithText(
      "borrar",
      "Seguro que queres borrar este repuesto???",
      "Para confirmar ingresa: borrar"
    );
    if (res) {
      const response = await deleteReplacement(id);
      await SwalToast(`Se borro el repuesto!!!`, 800);
      navigate("/replacements/list");
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="container p-2">
      <div className="d-flex justify-content-between">
        <NavLink className="btn btn-info" to="/replacements/list">
          Volver
        </NavLink>
        <button onClick={() => handleDelete(id)} className="btn btn-danger">
          Borrar
        </button>
      </div>
      <h2 className="text-center">Actualizar</h2>
      {replacement && (
        <Form
          inputs={replacement}
          onHandleChange={handleChange}
          onHandleSubmit={handleSubmit}
          textButton="Actualizar"
        />
      )}
    </div>
  );
}
