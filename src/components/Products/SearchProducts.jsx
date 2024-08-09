import { useState } from "react";
import { searchProduct } from "../../utils/data";

export default function SearchProducts({ handleSearchPoducts }) {
  const DESCRIPTION = "DESCRIPCION - EJ: SSD 240";
  const CODIGO = "CODIGO - EJ: 801563";
  const [input, setInput] = useState("");
  const [searchBy, setSearchBy] = useState("description");
  const [placeholder, setPlaceholder] = useState(DESCRIPTION);

  const handleInputChange = (event) => {
    const input = event.target.value;
    setInput(input);
  };

  const handleKeyDown = async (event) => {
    const keyCode = event.keyCode;
    if (keyCode === 13) handleSearch();

    if (keyCode === 115) {
      setSearchBy((prev) => {
        if (prev === "description") return "code";
        if (prev === "code") return "description";
      });
      setPlaceholder((prev) => {
        if (prev === DESCRIPTION) return CODIGO;
        if (prev === CODIGO) return DESCRIPTION;
      });
      handleSearchPoducts([]);
      setInput("");
    }
  };

  const handleSearch = async () => {
    if (input.length < 3) return;
    const response = await searchProduct({ input, searchBy });
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
          placeholder={placeholder}
        />

        <button className="btn btn-outline-success" onClick={handleSearch}>
          Buscar
        </button>
      </div>
      <p className="py-2 text-start text-white fw-bolder">
        F4 para cambiar el tipo de busqueda
      </p>
    </>
  );
}
