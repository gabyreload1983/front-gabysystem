import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { SwalError, getFromApi } from "../../utils";
import OrderList from "./OrderList";

export default function Orders() {
  let { filter } = useParams();

  if (filter.includes("pending") || filter.includes("technical")) {
    filter = filter.split("-").join("/");
  }

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { logoutUserContext } = useContext(UserContext);

  const getOrders = async () => {
    const response = await getFromApi(
      `http://${import.meta.env.VITE_URL_HOST}/api/orders/${filter}`
    );

    if (response.status === "error" && response.message === "jwt-expired") {
      await SwalError(response);
      logoutUserContext();
      return navigate("/login");
    }
    if (response.status === "error") return await SwalError(response);

    if (response.status === "success") return setOrders(response.payload);
  };

  useEffect(() => {
    getOrders();
  }, [filter]);

  return (
    <div className="container">
      {orders.length === 0 ? (
        <h3 className="text-center mt-3">Loading...</h3>
      ) : (
        <>
          <h3 className="text-center mt-3">
            <span className="badge bg-warning">TOTAL {orders.length}</span>
          </h3>
          <OrderList orders={orders} />
        </>
      )}
    </div>
  );
}
