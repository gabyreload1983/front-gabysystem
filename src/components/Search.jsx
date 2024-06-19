import React, { useState } from "react";

export default function Search({
  onSearch,
  onClean,
  searchDescription = "Buscar",
}) {
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

  const handleClean = async () => {
    setInput("");
    onClean();
  };

  return (
    <div className="d-flex ms-auto mb-3 gap-2">
      <input
        className="form-control me-2"
        type="search"
        placeholder={searchDescription}
        onChange={handleInputChange}
        name="search"
        onKeyDown={handleKeyDown}
        value={input}
      />
      <button className="btn btn-success" onClick={handleClick}>
        Buscar
      </button>
      <button className="btn btn-warning" onClick={handleClean}>
        Limpiar
      </button>
    </div>
  );
}
