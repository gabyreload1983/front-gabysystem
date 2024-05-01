import { useState, useContext } from "react";
import { getFromApi } from "../../utils";
import { UserContext } from "../../context/userContext";

export default function ServiceWork() {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext);

  const getOrders = async () => {
    const url = `http://${
      import.meta.env.VITE_URL_HOST
    }/api/orders/pendings-all`;

    const data = await getFromApi(url);

    setOrders(data.payload);
  };

  useState(() => {
    getOrders();
  }, []);

  const ordersInfo = {
    pc: 0,
    printers: 0,
    process: 0,
    processPc: 0,
    processPrinter: 0,
    myOrders: 0,
  };

  for (const order of orders) {
    if (order.estado === 21 && order.codiart === ".PC") ordersInfo.pc++;
    if (order.estado === 21 && order.codiart === ".IMP") ordersInfo.printers++;
    if (order.estado === 22 && order.codiart === ".PC") ordersInfo.processPc++;
    if (order.estado === 22 && order.codiart === ".IMP")
      ordersInfo.processPrinter++;
    if (order.estado === 22 && order.tecnico === user.code_technical)
      ordersInfo.myOrders++;
  }

  return (
    <div>
      <h2>Resumen</h2>
      {
        <>
          <p>pc: {ordersInfo["pc"]}</p>
          <p>printers: {ordersInfo["printers"]}</p>
          <p>
            process: {ordersInfo["processPc"] + ordersInfo["processPrinter"]}
          </p>
          <p>processPc: {ordersInfo["processPc"]}</p>
          <p>processPrinter: {ordersInfo["processPrinter"]}</p>
          <p>myOrders:{ordersInfo["myOrders"]}</p>
        </>
      }
    </div>
  );
}
