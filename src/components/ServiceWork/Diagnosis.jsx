import { useState } from "react";

export default function Diagnosis({ serviceDiagnosis, serviceWorkSave }) {
  const [diagnosis, setDiagnosis] = useState(serviceDiagnosis);
  const handleOnclick = async () => {
    serviceWorkSave(diagnosis);
  };

  const handleOnChange = (e) => {
    const textArea = e.target.value;
    setDiagnosis(textArea);
  };

  return (
    <div className="p-3 m-0 text-start border rounded-2 d-flex flex-column">
      <div className="d-flex justify-content-center">
        <strong className="bg-info px-3 py-1 rounded text-center">
          Diagnostico
        </strong>
      </div>
      <textarea
        value={diagnosis}
        className="form-control mt-2"
        rows="5"
        onChange={handleOnChange}
        // disabled={user.code_technical !== order.tecnico || order.estado !== 22}
      ></textarea>
      <div className="d-flex justify-content-end">
        <button onClick={handleOnclick} className="btn btn-info mt-2">
          Guardar
        </button>
      </div>
    </div>
  );
}
