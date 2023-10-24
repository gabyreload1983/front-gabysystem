import React, { useContext, useEffect } from "react";
import SummariesList from "./SummariesList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { SwalError, getFromApi, validateStatus } from "../../utils";
import { BarLoader } from "react-spinners";

export default function Summaries() {
  const navigate = useNavigate();
  const { logoutUserContext } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [customers, setCustomers] = useState([]);

  const getCustomers = async () => {
    try {
      setLoader(true);

      const response = await getFromApi(
        `http://${import.meta.env.VITE_URL_HOST}/api/customers/summaries`
      );
      setLoader(false);

      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

      if (response.status === "success") {
        setCustomers(response.payload);
      }
    } catch (error) {
      SwalError(error);
    }
  };

  const handleEmailSummary = async (customer) => {
    console.log(customer.codigo, customer.mail, customer.balance);
  };

  const handleChangeEmail = async (e) => {
    const { name, value } = e.target;
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) => {
        if (customer.codigo === name) return { ...customer, mail: value };
        return customer;
      })
    );
  };

  const handleChangePhone = async (e) => {
    const { name, value } = e.target;
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) => {
        if (customer.codigo === name) return { ...customer, telefono: value };
        return customer;
      })
    );
  };

  return (
    <div className="container">
      <div className="row my-3">
        <div className="col d-flex justify-content-between">
          <span className="fs-3">CANTIDAD: {customers.length}</span>
          <button onClick={getCustomers} className="btn btn-outline-info">
            Listar Deudores
          </button>
        </div>
      </div>
      {loader && <BarLoader color="#36d7b7" cssOverride={{ width: "100%" }} />}
      <SummariesList
        customers={customers}
        onHandleChangeEmail={handleChangeEmail}
        onHandleEmailSummary={handleEmailSummary}
        onHandleChangePhone={handleChangePhone}
      />
    </div>
  );
}
