import moment from "moment";
import React, { useContext, useState } from "react";
import { SwalError, SwalToast } from "../../utils";
import { UserContext } from "../../context/userContext";
import axios from "axios";

export default function Payment() {
  const { logoutUserContext } = useContext(UserContext);

  const [payment, setPayment] = useState({
    internalId: "",
    date: "",
    type: "PAY",
    value: "",
    observation: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPayment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const savePayment = async () => {
    payment.date = moment().format("YYYY-MM-DD");

    if (!payment.observation || !payment.value)
      return SwalError({ message: "Completa los dos campos" });

    try {
      const response = await axios.post(
        `http://${import.meta.env.VITE_URL_HOST}/api/alexis/payment`,
        { item: payment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (response?.data?.payload) {
        SwalToast("Se ingreso el pago correctamente", 1000);
      }
    } catch (error) {
      console.log(error);
      SwalError(error);
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
          />
          <label htmlFor="value">Importe</label>
        </div>

        <button className="btn btn-primary" onClick={savePayment}>
          GRABAR
        </button>
      </div>
    </div>
  );
}
