import React, { useState } from "react";

export default function Search({ onSearch }) {
  const [input, setInput] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyDown = async (event) => {
    const keyCode = event.keyCode;
    if (keyCode === 13 && input.length >= 3) onSearch(input);
  };

  const handleClick = async () => {
    if (input.length >= 3) onSearch(input);
  };

  return (
    <div className="d-flex ms-auto mb-3">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Buscar"
        onChange={handleInputChange}
        name="search"
        onKeyDown={handleKeyDown}
      />
      <button className="btn btn-outline-success" onClick={handleClick}>
        Buscar
      </button>
    </div>
  );
}
