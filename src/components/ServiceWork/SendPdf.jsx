import { useState } from "react";
import { API_URL } from "../../constants";
import { postToApi, sendCustomerPdf } from "../../utils";

export default function SendPdf({ nrocompro }) {
  const [loading, setLoading] = useState(false);

  const sendPdf = async () => {
    setLoading(true);
    await sendCustomerPdf({ nrocompro });
    setLoading(false);
  };
  return (
    <button onClick={sendPdf} className="btn btn-success">
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
