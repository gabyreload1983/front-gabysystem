import React, { useContext, useEffect, useState } from "react";
import { SwalError, SwalToast, getFromApi, validateStatus } from "../../utils";
import CustomersList from "./CustomersList";
import CustomerOrdersList from "./CustomerOrdersList";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { API_URL } from "../../constants";

export default function Customers() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { logoutUserContext } = useContext(UserContext);

  const getCustomers = async (search) => {
    try {
      const response = await getFromApi(`${API_URL}/api/customers/${search}`);

      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

      if (response.status === "success") setCustomers(response.payload);
    } catch (error) {
      SwalError(error);
    }
  };

  const getCustomerOrders = async (code) => {
    try {
      const response = await getFromApi(
        `${API_URL}/api/orders/customer/${code}`
      );

      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

      if (response.status === "success") {
        setOrders(response.payload);
        response.payload.length === 0 &&
          SwalToast("Cliente sin ordenes de reparacion!");
      }
    } catch (error) {
      SwalError(error);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleSearchCustomers = async (event) => {
    const keyCode = event.keyCode;
    if (keyCode === 13 && search.length >= 3) {
      setOrders([]);
      getCustomers(search);
    }
  };

  const handleSearchOrderDetail = async (nrocompro) => {
    navigate(`/servicework/detail/${nrocompro}`);
  };

  const handleSearchCustomerOrders = async (code) => {
    setCustomers((prev) => prev.filter((c) => c.codigo === code));
    getCustomerOrders(code);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-8 col-lg-4 mt-5">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Buscar cliente"
              onChange={handleChange}
              value={search}
              onKeyDown={handleSearchCustomers}
            />
            <label htmlFor="floatingInput">Buscar cliente</label>
          </div>
        </div>
        <div className="col-12">
          <CustomersList
            customers={customers}
            onSearchCustomerOrders={handleSearchCustomerOrders}
          />
        </div>
        <div className="col-12">
          {orders.length > 0 && (
            <CustomerOrdersList
              orders={orders}
              onSearchOrderDetail={handleSearchOrderDetail}
            />
          )}
        </div>
      </div>
    </div>
  );
}
