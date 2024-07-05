import React, { useContext, useEffect, useState } from "react";
import Search from "../../components/Search";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomersList from "../../components/CustomersList";
import { UserContext } from "../../context/userContext";
import {
  SwalError,
  SwalSuccess,
  getFromApi,
  putToApi,
  question,
  validateStatus,
} from "../../utils";
import OrderDetailHeader from "./OrderDetail/OrderDetailHeader";
import { BarLoader } from "react-spinners";
import { API_URL } from "../../constants";
import ButtonPdf from "../../components/ServiceWork/ButtonPdf";

export default function UpdateCustomer() {
  const navigate = useNavigate();
  const { logoutUserContext } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || false;
  const [customers, setCustomers] = useState([]);
  const [order, setOrder] = useState(false);
  const [customer, setCustomer] = useState(false);
  const [disableUpdate, setDisableUpdate] = useState(true);

  const getOrder = async () => {
    try {
      setLoader(true);
      const response = await getFromApi(`${API_URL}/api/orders/${orderId}`);
      setLoader(false);

      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

      if (response.status === "success") setOrder(response.payload);
    } catch (error) {
      SwalError(error);
    }
  };

  const handleSearch = async (input) => {
    try {
      if (input.length >= 3) {
        setLoader(true);
        const response = await getFromApi(`${API_URL}/api/customers/${input}`);
        setLoader(false);

        if (validateStatus(response) === "jwt-expired") {
          logoutUserContext();
          return navigate("/login");
        }

        if (response.status === "success") setCustomers(response.payload);
      }
    } catch (error) {
      SwalError(error);
    }
  };

  const handleSelected = async (input) => {
    setDisableUpdate(false);
    setCustomer(input);
    setOrder((prev) => ({
      ...prev,
      nombre: input.nombre,
    }));
  };

  const updateCustomer = async () => {
    try {
      const confirm = await question("Confirma Actualizar Cliente??");
      if (!confirm) return;
      setLoader(true);
      const response = await putToApi(`${API_URL}/api/orders/update-customer`, {
        nrocompro: order.nrocompro,
        customerId: customer.codigo,
      });
      setLoader(false);

      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

      if (response.status === "success") {
        setDisableUpdate(true);
        return SwalSuccess(response.message);
      }
    } catch (error) {
      SwalError(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, [orderId]);

  return (
    <div className="container">
      {loader && <BarLoader color="#36d7b7" cssOverride={{ width: "100%" }} />}
      <div className="row mt-3">
        <h2>Actualizar Cliente</h2>
        <div className="col-12 my-3 border border-success rounded p-2">
          <h4>
            {orderId} - {order.nombre}
          </h4>
          <OrderDetailHeader order={order} />
          <div className="d-flex">
            <button
              className="btn btn-success"
              onClick={updateCustomer}
              disabled={disableUpdate}
            >
              ACTUALIZAR
            </button>
            <div className="d-flex ms-auto gap-2">
              <ButtonPdf nrocompro={order.nrocompro} />
              <ButtonPdf nrocompro={order.nrocompro} customer={true} />
            </div>
          </div>
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
