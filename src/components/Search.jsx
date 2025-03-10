import React, { useState } from "react";

export default function Search({ onSearch, onClean }) {
  const SEARCH_BY = {
    DESCRIPTION: "description",
    PHONE: "phone",
    EMAIL: "email",
  };
  const PLACEHOLDER_SEARCH_BY = {
    DESCRIPTION: "Descripcion",
    PHONE: "Telefono",
    EMAIL: "Email",
  };

  const [input, setInput] = useState("");
  const [serchBy, setSerchBy] = useState(SEARCH_BY.DESCRIPTION);
  const [placeholder, setPlaceholder] = useState(
    PLACEHOLDER_SEARCH_BY.DESCRIPTION
  );

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyDown = async (event) => {
    const { key } = event;

    if (key === "Enter" && input.length >= 3) onSearch(serchBy, input);
    if (key === "F4") {
      setSerchBy((prev) => {
        if (prev === SEARCH_BY.DESCRIPTION) return SEARCH_BY.PHONE;
        if (prev === SEARCH_BY.PHONE) return SEARCH_BY.EMAIL;
        if (prev === SEARCH_BY.EMAIL) return SEARCH_BY.DESCRIPTION;
      });
      setPlaceholder((prev) => {
        if (prev === PLACEHOLDER_SEARCH_BY.DESCRIPTION)
          return PLACEHOLDER_SEARCH_BY.PHONE;
        if (prev === PLACEHOLDER_SEARCH_BY.PHONE)
          return PLACEHOLDER_SEARCH_BY.EMAIL;
        if (prev === PLACEHOLDER_SEARCH_BY.EMAIL)
          return PLACEHOLDER_SEARCH_BY.DESCRIPTION;
      });
      setInput("");
    }
  };

  const handleClick = async () => {
    if (input.length >= 3) onSearch(serchBy, input);
  };

  const handleClean = async () => {
    setInput("");
    onClean();
  };

  return (
    <div className="p-3 border rounded">
      <input
        className="form-control me-2"
        type="search"
        placeholder={`${placeholder}`}
        onChange={handleInputChange}
        name="search"
        onKeyDown={handleKeyDown}
        value={input}
        id="search"
      />
      <label htmlFor="search" className="form-label mt-1">
        F4 para cambiar busqueda
      </label>
      <div className="d-flex gap-2">
        <button className="btn btn-success" onClick={handleClick}>
          Buscar
        </button>
        <button className="btn btn-warning" onClick={handleClean}>
          Limpiar
        </button>
      </div>
    </div>
  );
}
