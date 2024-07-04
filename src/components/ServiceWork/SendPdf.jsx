import { useState } from "react";

export default function SendPdf({ nrocompro }) {
  const [loading, setLoading] = useState(false);

  const sendPdf = async () => {
    console.log(nrocompro);
  };
  return (
    <button onClick={sendPdf} className="btn btn-success" disabled>
      {loading ? (
        <>
          <span>Enviando... </span>
          <div
            className="spinner-border text-dark spinner-border-sm"
            role="status"
          ></div>
        </>
      ) : (
        <span>Enviar PDF</span>
      )}
    </button>
  );
}
