import moment from "moment";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../constants";
import { SwalError, SwalToast } from "../../utils/alerts";
import { getJWT } from "../../utils/tools";

export default function Payment() {
  const { logoutUserContext } = useContext(UserContext);
  const CURRENT_YEAR = moment().format("YYYY");
  const yearsAvailable = [
    CURRENT_YEAR,
    CURRENT_YEAR - 1,
    ,
    CURRENT_YEAR - 2,
    CURRENT_YEAR - 3,
    CURRENT_YEAR - 4,
    CURRENT_YEAR - 5,
  ];

  const handleYear = (e) => {
    const { value } = e.target;
    setPayment((prev) => ({ ...prev, yearApply: value }));
  };

  const [payment, setPayment] = useState({
    internalId: "",
    date: "",
    type: "PAY",
    value: "",
    observation: "",
    yearApply: CURRENT_YEAR,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPayment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const savePayment = async () => {
    try {
      if (!payment.observation || !payment.value)
        return SwalError("Completa los dos campos");

      const answer = await Swal.fire({
        text: `Ingresar pago???`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });

      if (!answer.isConfirmed) return;

      payment.date = moment().format("YYYY-MM-DD");

      const response = await axios.post(
        `${API_URL}/api/alexis/payment`,
        { item: payment },
        {
          headers: {
            Authorization: `Bearer ${getJWT()}`,
          },
        }
      );

      if (response?.data?.payload) {
        setPayment({
          internalId: "",
          date: "",
          type: "PAY",
          value: "",
          observation: "",
        });
        SwalToast("Se ingreso el pago correctamente", 1000);
      }
    } catch (error) {
      SwalError(error?.message);
      if (error?.response?.status === 403) {
        logoutUserContext();
      }
    }
  };

  return (
    <div className="row">
      <div className="col-4 border rounded p-3">
        <h2>PAGO ALEXIS</h2>
        <div className="form-floating mb-3">
          <input
            className="form-control form-control-sm"
            id="observation"
            onChange={handleChange}
            type="text"
            placeholder="Observacion"
            name="observation"
            value={payment.observation}
            required
          />
          <label htmlFor="observation">Observacion</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control form-control-sm"
            id="value"
            onChange={handleChange}
            type="text"
            placeholder="Nombre"
            name="value"
            required
            value={payment.value}
          />
          <label htmlFor="value">Importe</label>
        </div>
        <div className="form-floating mb-3">
          <select
            value={payment.yearApply}
            name="yearApply"
            id="yearApply"
            className="form-select"
            onChange={handleYear}
          >
            {yearsAvailable.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <label htmlFor="yearApply">Cuenta</label>
        </div>

        <button className="btn btn-primary" onClick={savePayment}>
          GRABAR
        </button>
      </div>
    </div>
  );
}
