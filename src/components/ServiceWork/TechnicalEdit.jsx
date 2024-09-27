import Swal from "sweetalert2";

export default function TechnicalEdit({
  serviceWork,
  handleSaveServiceWork,
  handleCloseServiceWork,
  handleOnChange,
}) {
  const handleClose = async (diagnosisStatus) => {
    const { value: cost } = await Swal.fire({
      title: `Cerrar orden ${serviceWork.nrocompro} ${
        diagnosisStatus ? "" : "Sin Reparacion"
      } `,
      input: "text",
      inputLabel: "COSTO: $",
      inputValue: Number(serviceWork.costo).toFixed(),
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || Number(value) <= 0 || isNaN(Number(value))) {
          return "Ingresa un valor igual o superior a 1.";
        }
      },
    });
    if (cost) {
      let notification = false;

      const notificationResponse = await Swal.fire({
        text: `Enviar notificacion por email y whatsapp?`,
        showCancelButton: true,
        cancelButtonText: "Cerrar Sin Notificaciones",
        confirmButtonText: "Cerrar y Enviar Notificaciones",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      if (notificationResponse.isConfirmed) notification = true;
      diagnosisStatus = diagnosisStatus ? "repair" : "withoutrepair";
      handleCloseServiceWork({
        diagnosisStatus,
        notification,
        cost,
      });
    }
  };

  const handleSave = async () => {
    handleSaveServiceWork(serviceWork.diagnostico);
  };

  const onHandleOnChange = (e) => {
    const textArea = e.target.value;
    handleOnChange(textArea);
  };

  return (
    <div className="my-2 p-3 m-0 text-start border rounded-2 d-flex flex-column">
      <div className="d-flex justify-content-center">
        <strong className="bg-info px-3 py-1 rounded text-center">
          Diagnostico
        </strong>
      </div>
      <textarea
        value={serviceWork.diagnostico}
        className="form-control mt-2"
        rows="5"
        onChange={onHandleOnChange}
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
