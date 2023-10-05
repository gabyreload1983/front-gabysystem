import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { SwalError, getFromApi } from "../../utils";
import PieOrdersPending from "../../components/PieOrdersPending";
import { BarLoader } from "react-spinners";

export default function OrdersGraphics() {
  const [loader, setLoader] = useState(false);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();
  const { logoutUserContext } = useContext(UserContext);

  const getOrders = async () => {
    setLoader(true);

    const response = await getFromApi(
      `http://${import.meta.env.VITE_URL_HOST}/api/orders/pendings-all`
    );

    setLoader(false);
    if (response.status === "error" && response.message === "jwt-expired") {
      await SwalError(response);
      logoutUserContext();
      return navigate("/login");
    }
    if (response.status === "error") return await SwalError(response);

    if (response.status === "success") {
      return setOrders(response.payload);
    }
  };

  const handleClick = async (link) => {
    console.log(link);
    navigate(link);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      {loader && <BarLoader color="#36d7b7" cssOverride={{ width: "100%" }} />}
      <div className="row mt-3">
        <div
          className="col-12 col-md-6 d-flex justify-content-center"
          style={{ height: "300px" }}
        >
          <PieOrdersPending
            onHandleClick={handleClick}
            orders={orders}
            labels={["PC Pendientes", "PC En Proceso"]}
            sector={".PC"}
          />
        </div>
        <div
          className="col-12 col-md-6 d-flex justify-content-center"
          style={{ height: "300px" }}
        >
          <PieOrdersPending
            onHandleClick={handleClick}
            orders={orders}
            labels={["Impresoras Pendientes", "Impresoras En Proceso"]}
            sector={".IMP"}
          />
        </div>
      </div>
    </>
  );
}
