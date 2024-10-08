import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { takeServiceWork } from "../../utils/data";
import Swal from "sweetalert2";

export default function TakeServiceWorkButton({ nrocompro, codeTechnical }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleOnClick = async () => {
    let notification = false;

    const notificationResponse = await Swal.fire({
      icon: "question",
      text: `Tomar orden?`,
      showCancelButton: true,
      confirmButtonText: "Tomar y Enviar Notificaciones",
      cancelButtonText: "Tomar Sin Notificaciones",
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#ffc107",
    });
    if (notificationResponse.isConfirmed) notification = true;

    setLoading(true);
    const response = await takeServiceWork({
      nrocompro,
      codeTechnical,
      notification,
    });
    setLoading(false);
    if (response.status === "success") navigate(`/servicework/my-works`);
  };
  return (
    <button className="w-100 btn btn-success btn-sm" onClick={handleOnClick}>
      <span className="me-2">TOMAR</span>
      {loading && (
        <div
          className="spinner-border text-dark spinner-border-sm"
          role="status"
        ></div>
      )}
    </button>
  );
}
