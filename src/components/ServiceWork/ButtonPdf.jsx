import { getPdfServiceWork } from "../../utils";
import { API_URL } from "../../constants";

export default function ButtonPdf({ nrocompro }) {
  const handleClick = async () => {
    const pdf = await getPdfServiceWork({ nrocompro });
    if (pdf) window.open(`${API_URL}/pdfHistory/${pdf}`, "_blank");
  };

  return (
    <button onClick={handleClick} className="btn btn-warning" target="_blank">
      PDF
    </button>
  );
}
