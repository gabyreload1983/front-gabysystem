import { useState } from "react";

export default function SendPdf({ serviceWork, handleSendPdf }) {
  const [loading, setLoading] = useState(false);

  const sendPdf = async () => {
    setLoading(true);
    await handleSendPdf();
    setLoading(false);
  };

  return (
    <button
      onClick={sendPdf}
      className={`btn btn-${serviceWork.nroenvio ? "success" : "warning"}`}
      disabled={loading}
    >
      {loading ? (
        <>
          <span>Enviando... </span>
          <div
            className="spinner-border text-dark spinner-border-sm"
            role="status"
          ></div>
        </>
      ) : (
        <>
          {serviceWork.nroenvio ? (
            <span>Renviar Orden</span>
          ) : (
            <span>Enviar Orden</span>
          )}
        </>
      )}
    </button>
  );
}
