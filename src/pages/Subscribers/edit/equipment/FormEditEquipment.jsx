import { useEffect, useState } from "react";
import { isValidUUID } from "../../../../utils/validation";
import { SwalError, SwalQuestion } from "../../../../utils/alerts";
import { formatUUID } from "../../../../utils/tools";
import { useNavigate, useParams } from "react-router-dom";
import {
  editEquipment,
  getSubscriber,
  removeEquipment,
} from "../../../../utils/data";

export default function FormEditEquipment() {
  const { id, uuid } = useParams();
  const [subscriber, setSubscriber] = useState();
  const navigate = useNavigate();

  const [equipmentForm, setEquipmentForm] = useState({
    uuid: "",
    equipment_type: "",
    name: "",
    observation: "",
  });

  const getData = async () => {
    const data = await getSubscriber({ code: id });
    if (!data || !data.status) return;
    setEquipmentForm(data.equipments.find((e) => e.uuid === uuid));
    setSubscriber(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    equipmentForm.uuid = formatUUID(equipmentForm.uuid);

    if (!isValidUUID(equipmentForm.uuid)) {
      return SwalError(
        "Formato de UUID invalido. Ej. 6A933A0-B8EA-11DC-8EE2-1C872C5869D6"
      );
    }

    const response = await editEquipment(equipmentForm);
    if (response)
      setEquipmentForm({
        uuid: "",
        equipment_type: "",
        name: "",
        observation: "",
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEquipmentForm((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRemoveEquipment = async () => {
    const answer = await SwalQuestion(
      "Seguro que quieres eliminar este equipo del abono???"
    );
    if (answer) {
      const res = await removeEquipment({ equipmentToRemove: equipmentForm });
      navigate(`/subscribers/detail/${id}`);
    }
  };

  useEffect(() => {
    getData();
  }, [uuid]);

  return (
    <div className="container">
      <form
        id="equipmentForm"
        className="bg-secondary p-3 text-dark rounded"
        onSubmit={handleSubmit}
      >
        <div className="form-floating mb-3">
          <input
            className="form-control form-control-sm"
            id="uuid"
            type="text"
            placeholder="Nombre"
            name="uuid"
            required
            value={equipmentForm["uuid"]}
            onChange={handleChange}
          />
          <label htmlFor="uuid">UUID</label>
        </div>

        <div className="form-floating mb-3">
          <select
            name="equipment_type"
            required
            className="form-select form-select-sm mb-3"
            onChange={handleChange}
            value={equipmentForm.equipment_type}
          >
            <option value="PC">PC ESCRITORIO</option>
            <option value="NOTEBOOK">NOTEBOOK</option>
            <option value="PRINTER">IMPRESORA</option>
            <option value="SERVER">SERVIDOR</option>
          </select>
          <label htmlFor="equipment_type">TIPO</label>
        </div>

        <div className="form-floating mb-3">
          <input
            className="form-control form-control-sm"
            id="name"
            type="text"
            placeholder="Nombre"
            name="name"
            value={equipmentForm["name"]}
            onChange={handleChange}
          />
          <label htmlFor="name">NOMBRE</label>
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control form-control-sm"
            id="observation"
            name="observation"
            placeholder="observation"
            style={{ height: "150px" }}
            value={equipmentForm["observation"]}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="observation">Observacion</label>
        </div>
        <button className="btn btn-success me-2">GUARDAR</button>
      </form>

      <button className="btn btn-danger" onClick={handleRemoveEquipment}>
        Quitar
      </button>
    </div>
  );
}
