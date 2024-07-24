import { useState } from "react";
import Swal from "sweetalert2";

export default function TechnicalEdit({
  serviceWorkToEdit,
  handleSaveServiceWork,
  serviceWorkClose,
}) {
  const [serviceWork, setServiceWork] = useState(serviceWorkToEdit);

  const handleClose = async (diagnosisStatus) => {
    diagnosisStatus = diagnosisStatus ? 22 : 23;
    const { value: cost } = await Swal.fire({
      title: `Cerrar orden ${serviceWork.nrocompro} ${
        diagnosis ? "" : "Sin Reparacion"
      } `,
      input: "text",
      inputLabel: "COSTO: $",
      inputValue: Number(serviceWork.costo).toFixed(),
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || Number(value) >= 0 || isNaN(Number(value))) {
          return "Ingresa un valor igual o superior a 1.";
        }
      },
    });
    if (cost) {
      setServiceWork((prev) => ({ ...prev, costo: Number(cost) }));
      serviceWorkClose({ diagnosisStatus, diagnosis: serviceWork.diagnostico });
    }
  };

  const handleSave = async () => {
    handleSaveServiceWork(serviceWork.diagnostico);
  };

  const handleOnChange = (e) => {
    const textArea = e.target.value;
    setServiceWork((prev) => ({ ...prev, diagnostico: textArea }));
  };

  return (
    <div className="p-3 m-0 text-start border rounded-2 d-flex flex-column">
      <div className="d-flex justify-content-center">
        <strong className="bg-info px-3 py-1 rounded text-center">
          Diagnostico
        </strong>
      </div>
      <textarea
        value={serviceWork.diagnostico}
        className="form-control mt-2"
        rows="5"
        onChange={handleOnChange}
      ></textarea>
      <div className="d-flex gap-2">
        <button
          onClick={() => handleClose(true)}
          className="btn btn-success mt-2"
        >
          Reparado
        </button>
        <button
          onClick={() => handleClose(false)}
          className="btn btn-danger mt-2"
        >
          Sin Reparacion
        </button>
        <button onClick={handleSave} className="btn btn-info ms-auto mt-2">
          Guardar
        </button>
      </div>
    </div>
  );
}
