import { useState } from "react";
import { isValidMacAddress } from "../../../../utils/validation";
import { SwalError } from "../../../../utils/alerts";
import { formatMac } from "../../../../utils/tools";

export default function FormAdEquipment({ onHandleAddEquipment }) {
  const [equipmentForm, setEquipmentForm] = useState({
    mac: "",
    equipment_type: "",
    name: "",
    observation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const newEquipment = {};
    for (const [key, value] of form) {
      newEquipment[key] = value;
    }

    newEquipment.mac = formatMac(newEquipment.mac);

    if (!isValidMacAddress(newEquipment.mac)) {
      return SwalError("Formato de MAC invalido. Ej. 08-00-27-85-E9-9E");
    }

    const response = await onHandleAddEquipment(newEquipment);
    if (response)
      setEquipmentForm({
        mac: "",
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

  return (
    <form
      id="equipmentForm"
      className="bg-secondary p-3 text-dark rounded"
      onSubmit={handleSubmit}
    >
      <div className="form-floating mb-3">
        <input
          className="form-control form-control-sm"
          id="mac"
          type="text"
          placeholder="Nombre"
          name="mac"
          required
          value={equipmentForm["mac"]}
          onChange={handleChange}
        />
        <label htmlFor="mac">MAC</label>
      </div>

      <div className="form-floating mb-3">
        <select
          name="equipment_type"
          required
          className="form-select form-select-sm mb-3"
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
      <button className="btn btn-success"> AGREGAR EQUIPO</button>
    </form>
  );
}
