import { getPdfServiceWork } from "../../utils";
import { API_URL } from "../../constants";

export default function ButtonPdf({ nrocompro }) {
  const handleClick = async () => {
    const response = await getPdfServiceWork({ nrocompro });
    if (response) {
      window.open(
        `${API_URL}/pdfHistory/orders/${response.fileName}`,
        "_blank"
      );
    }
  };

  return (
    <button onClick={handleClick} className="btn btn-warning" target="_blank">
      PDF Sinapsis
    </button>
  );
}
