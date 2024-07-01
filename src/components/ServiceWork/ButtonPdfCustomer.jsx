import { API_URL } from "../../constants";

export default function ButtonPdfCustomer({ nrocompro }) {
  const handleClick = async () => {
    window.open(`${API_URL}/pdfHistory/customers/${nrocompro}.pdf`, "_blank");
  };

  return (
    <button onClick={handleClick} className="btn btn-warning" target="_blank">
      PDF Cliente
    </button>
  );
}
