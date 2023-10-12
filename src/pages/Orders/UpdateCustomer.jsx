import React, { useContext, useEffect, useState } from "react";
import Search from "../../components/Search";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomersList from "../../components/CustomersList";
import { UserContext } from "../../context/userContext";
import { SwalError, getFromApi } from "../../utils";
import OrderDetailHeader from "./OrderDetail/OrderDetailHeader";

export default function UpdateCustomer() {
  const navigate = useNavigate();
  const { logoutUserContext } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || false;
  const [customers, setCustomers] = useState([]);
  const [order, setOrder] = useState(false);
  const [customer, setCustomer] = useState(false);
  const [enableUpdate, setEnableUpdate] = useState(true);

  const validateResponse = async (response) => {
    if (response.status === "error" && response.message === "jwt-expired") {
      await SwalError(response);
      logoutUserContext();
      return navigate("/login");
    }
    if (response.status === "error") return await SwalError(response);
    return response;
  };

  const getOrder = async () => {
    try {
      setLoader(true);
      const response = await getFromApi(
        `http://${import.meta.env.VITE_URL_HOST}/api/orders/${orderId}`
      );
      setLoader(false);
      validateResponse(response);

      if (response.status === "success") {
        setOrder(response.payload);
      }
    } catch (error) {}
  };

  const handleSearch = async (input) => {
    try {
      if (input.length >= 3) {
        setLoader(true);
        const response = await getFromApi(
          `http://${import.meta.env.VITE_URL_HOST}/api/customers/${input}`
        );
        setLoader(false);

        validateResponse(response);

        if (response.status === "success") {
          setCustomers(response.payload);
        }
      }
    } catch (error) {
      SwalError(error);
    }
  };

  const handleSelected = async (input) => {
    setEnableUpdate(false);
    setCustomer(input);
    setOrder((prev) => ({
      ...prev,
      nombre: input.nombre,
    }));
  };

  const updateCustomer = async () => {
    console.log("UPDATE", order, customer);
  };

  useEffect(() => {
    getOrder();
  }, [orderId]);

  return (
    <div className="container">
      <div className="row mt-3">
        <h2>Actualizar Cliente</h2>
        <div className="col-12 my-3 border border-success rounded p-2">
          <h4>
            {orderId} - {order.nombre}
          </h4>
          <OrderDetailHeader order={order} />
          <button
            className="btn btn-success ms-auto"
            onClick={updateCustomer}
            disabled={enableUpdate}
          >
            ACTUALIZAR
          </button>
        </div>
        <div className="col-12">
          <Search onSearch={handleSearch} />
          <CustomersList
            customers={customers}
            onHandleSelected={handleSelected}
          />
        </div>
      </div>
    </div>
  );
}
