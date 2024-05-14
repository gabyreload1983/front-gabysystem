import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { SwalError, getFromApi, validateStatus } from "../../utils";
import OrderList from "./OrderList";
import { BarLoader } from "react-spinners";
import { API_URL } from "../../constants";

export default function Orders() {
  const [loader, setLoader] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { logoutUserContext } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const sector = searchParams.get("sector") || false;
  const state = searchParams.get("state") || false;
  const technical = searchParams.get("technical") || false;
  let query = `${API_URL}/api/orders/pending/pc`;
  let title = "";

  const getOrders = async (query) => {
    try {
      setLoader(true);
      const response = await getFromApi(query);
      setLoader(false);

      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

      if (response.status === "success") return setOrders(response.payload);
    } catch (error) {
      SwalError(error);
    }
  };

  if (
    (sector === "pc" || sector === "imp") &&
    (state === "pending" || state === "process")
  ) {
    query = `${API_URL}/api/orders/${state}/${sector}`;
    title = `${sector} ${state}`;
  }

  if (technical) {
    query = `${API_URL}/api/orders/technical/${technical}`;
    title = `Ordenes ${technical}`;
  }

  if (state === "to-deliver" || state === "final-disposition") {
    query = `${API_URL}/api/orders/${state}`;
    title = `Ordenes ${state}`;
  }

  useEffect(() => {
    getOrders(query);
  }, [query]);

  return (
    <div className="container">
      <h3 className="text-center mt-3">
        {title} {orders.length}
      </h3>
      {loader && <BarLoader color="#36d7b7" cssOverride={{ width: "100%" }} />}
      {orders.length > 0 && <OrderList orders={orders} />}
    </div>
  );
}
