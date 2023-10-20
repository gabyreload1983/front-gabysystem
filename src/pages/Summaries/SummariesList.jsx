import React from "react";
import SummaryItem from "./SummaryItem";

export default function SummariesList({
  customers,
  onHandleChangeEmail,
  onHandleEmailSummary,
  onHandleChangePhone,
}) {
  return (
    <>
      <div className="col-12">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">CODIGO</th>
              <th scope="col">CLIENTE</th>
              <th scope="col">SALDO</th>
              <th scope="col">TIPO</th>
              <th scope="col">EMAIL</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 &&
              customers.map((customer) => (
                <tr key={customer.codigo}>
                  <SummaryItem
                    customer={customer}
                    onHandleChangeEmail={onHandleChangeEmail}
                    onHandleEmailSummary={onHandleEmailSummary}
                    onHandleChangePhone={onHandleChangePhone}
                  />
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
