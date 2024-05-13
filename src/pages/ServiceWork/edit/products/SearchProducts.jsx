import { useState } from "react";
import { searchProduct } from "../../../../utils";

export default function SearchProducts({ handleSearchPoducts }) {
  const [input, setInput] = useState("");

  const handleInputChange = (event) => {
    const input = event.target.value;
    setInput(input);
  };

  const handleKeyDown = async (event) => {
    const keyCode = event.keyCode;
    if (keyCode === 13) handleSearch();
  };

  const handleSearch = async () => {
    if (input.length < 3) return;
    const response = await searchProduct({ input });
    handleSearchPoducts(response);
  };

  return (
    <>
      <h2>Buscar Productos</h2>
      <div className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          onChange={handleInputChange}
          name="search"
          onKeyDown={handleKeyDown}
          id="search"
          value={input}
          placeholder="EJ: SSD 240"
        />

        <button className="btn btn-outline-success" onClick={handleSearch}>
          Buscar
        </button>
      </div>
    </>
  );
}
