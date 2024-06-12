import React, { useContext, useState } from "react";
import { SwalError, SwalSuccess, getFromApi, validateStatus } from "./../utils";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { API_URL } from "../constants";

export default function SearchProduct({ onChangeProducts }) {
  const [input, setInput] = useState(null);
  const [searchBy, setSearchBy] = useState("description");
  const navigate = useNavigate();
  const { logoutUserContext } = useContext(UserContext);

  const searchProduct = async () => {
    try {
      if (!input)
        return Swal.fire({
          text: `Ingrese al menos 3 caracteres`,
          icon: "error",
        });
      if (searchBy === "ean" && input.split("").length !== 13)
        return Swal.fire({
          text: `Ingrese un codigo de 13 numeros`,
          icon: "error",
        });

      const response = await getFromApi(
        `${API_URL}/api/products/search-by?${searchBy}=${input}`
      );
      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

      if (response.status === "success")
        return onChangeProducts(response.payload);
    } catch (error) {
      SwalError(error);
    }
  };

  const handleSearchChange = (event) => {
    const input = event.target.value;
    setInput(input);
  };

  const handleKeyDown = async (event) => {
    const keyCode = event.keyCode;
    if (keyCode === 13) searchProduct();
    if (keyCode === 115) {
      document.querySelector("#search").value = "";
      setSearchBy((prev) => {
        if (prev === "code") return "ean";
        if (prev === "ean") return "description";
        if (prev === "description") return "code";
      });
    }
  };

  const formatSearchBy = (searcBy) => {
    if (searcBy === "code") return "CODIGO";
    if (searcBy === "ean") return "AEN";
    if (searcBy === "description") return "DESCRIPCION";
  };

  return (
    <div className="col p-3">
      <div className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder={`${formatSearchBy(searchBy)}`}
          onChange={handleSearchChange}
          name="search"
          onKeyDown={handleKeyDown}
          id="search"
        />

        <button className="btn btn-success" onClick={searchProduct}>
          Buscar
        </button>
      </div>
      <div className="form-text">
        Presiona F4 para cambiar el tipo de busqueda
      </div>
    </div>
  );
}
