import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { takeServiceWork } from "../../utils/data";

export default function TakeServiceWorkButton({ nrocompro, codeTechnical }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleOnClick = async () => {
    setLoading(true);
    const response = await takeServiceWork({ nrocompro, codeTechnical });
    setLoading(false);
    if (response.status === "success") navigate(`/servicework/my-works`);
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
