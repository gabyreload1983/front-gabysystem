import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function SearchOrder() {
  const [orderInput, setOrderInput] = useState("");
  const navigate = useNavigate();
  const warningSearchOrder = {
    icon: "warning",
    title: "Ingresa los ultimos 5 numeros de la orden",
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  };

  const searchOrder = async () => {
    if (orderInput.length === 5) {
      let orderPrefix = "ORX0011000";
      const nrocompro = orderPrefix + orderInput;
      navigate(`/orders/detail/${nrocompro}`);
    }
    if (orderInput.length !== 5) await Swal.fire(warningSearchOrder);
  };

  const handleSearchChange = (event) => {
    const search = event.target.value;
    setOrderInput(search);
  };

  const handleKeyDown = async (event) => {
    const keyCode = event.keyCode;
    if (keyCode === 13) searchOrder();
  };

  return (
    <div className="d-flex m-auto">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Ultimos 5 numeros"
        onChange={handleSearchChange}
        name="search"
        onKeyDown={handleKeyDown}
      />
      <button className="btn btn-outline-success" onClick={searchOrder}>
        Buscar
      </button>
    </div>
  );
}
