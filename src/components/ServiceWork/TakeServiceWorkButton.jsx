import { useNavigate } from "react-router-dom";
import { takeServiceWork } from "../../utils";
import { useState } from "react";

export default function TakeServiceWorkButton({ nrocompro, codeTechnical }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleOnClick = async () => {
    setLoading(true);
    const response = await takeServiceWork({ nrocompro, codeTechnical });
    if (response.status === "success") navigate(`/orders/detail/${nrocompro}`);
    setLoading(false);
  };
  return (
    <button className="w-100 btn btn-success" onClick={handleOnClick}>
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
