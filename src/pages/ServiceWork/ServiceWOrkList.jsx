import { useState } from "react";
import { getFromApi } from "../../utils";
import OrderList from "../Orders/OrderList";

export default function ServiceWOrkList({ url }) {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const data = await getFromApi(url);

    setOrders(data.payload);
  };

  useState(() => {
    getOrders();
  }, [url]);

  return <OrderList orders={orders} />;
}
