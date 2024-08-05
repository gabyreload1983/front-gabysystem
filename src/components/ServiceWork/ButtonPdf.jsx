import { API_URL } from "../../constants";
import { BarLoader } from "react-spinners";
import { useState } from "react";
import { createPdfServiceWork } from "../../utils/data";

export default function ButtonPdf({ nrocompro, customer = false }) {
  const [loader, setLoader] = useState(false);
  const handleClick = async () => {
    setLoader(true);
    const response = await createPdfServiceWork({ nrocompro, customer });
    setLoader(false);

    if (response) {
      window.open(
        `${API_URL}/pdfHistory/${customer ? "customers" : "orders"}/${
          response.fileName
        }.pdf`,
        "_blank"
      );
    }
  };

  return (
    <button onClick={handleClick} className="btn btn-warning" target="_blank">
      PDF {customer ? "Orden" : "Productos"}
      {loader && <BarLoader color="#36d7b7" cssOverride={{ width: "100%" }} />}
    </button>
  );
}
