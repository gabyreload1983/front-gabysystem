import React from "react";

export default function SummaryItem({
  customer,
  onHandleChangeEmail,
  onHandleSendSummary,
}) {
  return (
    <>
      <td>{customer.codigo}</td>
      <td>{customer.nombre}</td>
      <td>{customer.saldo}</td>
      <td>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder={customer.mail || "Ingrese un email"}
            value={customer.mail}
            name={customer.codigo}
            onChange={onHandleChangeEmail}
          />
        </div>
      </td>
      <td>
        <button
          onClick={() => onHandleSendSummary(customer)}
          className="btn btn-outline-info btn-sm"
          disabled={!customer.mail}
        >
          Enviar Resumen
        </button>
      </td>
    </>
  );
}
