import { useState } from "react";
import ServiceWork from "../ServiceWork";
import { API_URL } from "../../../constants";
import { useNavigate, useSearchParams } from "react-router-dom";
export default function Filter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterBy = searchParams.get("by") || "to-deliver";

  const [url, setUrl] = useState(`${API_URL}/api/orders/${filterBy}`);

  const options = [
    { value: "final-disposition", description: "Disposicion Final" },
    { value: "to-deliver", description: "Para Entregar" },
  ];

  const handleChangeFilter = (e) => {
    const { value } = e.target;

    setUrl(`${API_URL}/api/orders/${value}`);
    navigate(`/servicework/filter?by=${value}`);
  };

  return (
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col-12 col-md-4 col-lg-3">
          <select
            name="filter"
            id="filter"
            className="form-select"
            value={filterBy}
            onChange={handleChangeFilter}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.description}
              </option>
            ))}
          </select>
        </div>
      </div>
      {url && <ServiceWork url={url} />}
    </div>
  );
}
