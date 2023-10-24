import React, { useContext, useEffect, useState } from "react";
import {
  SwalError,
  SwalToast,
  deleteToApi,
  getFromApi,
  validateStatus,
} from "../../utils";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { BarLoader } from "react-spinners";
import OrderListItem from "./OrderListItem";
import Swal from "sweetalert2";

export default function OrderList() {
  const navigate = useNavigate();
  const { logoutUserContext } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState([]);

  const getOrderList = async () => {
    try {
      setLoader(true);

      const response = await getFromApi(
        `http://${import.meta.env.VITE_URL_HOST}/api/products/order-list`
      );

      setLoader(false);
      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

      if (response.status === "success") setProducts(response.payload);
    } catch (error) {
      SwalError(error);
    }
  };

  const cleanOrderList = async () => {
    try {
      const question = await Swal.fire({
        text: `Queres limpiar la lista???`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });
      if (!question.isConfirmed) return;

      const response = await deleteToApi(
        `http://${import.meta.env.VITE_URL_HOST}/api/products/clear-order-list`
      );

      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

      if (response.status === "success") {
        getOrderList();
        SwalToast(response.message, 500);
      }
    } catch (error) {
      SwalError(error);
    }
  };

  const handleRemove = async (code) => {
    try {
      const response = await deleteToApi(
        `http://${
          import.meta.env.VITE_URL_HOST
        }/api/products/order-list/${code}`
      );

      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

      if (response.status === "success") {
        getOrderList();
        return SwalToast(response.message, 300);
      }
    } catch (error) {
      SwalError(error);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {loader && (
            <BarLoader color="#36d7b7" cssOverride={{ width: "100%" }} />
          )}
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="row justify-content-around my-2">
                  <div className="col">
                    <h1>Productos Pedidos: {products.length}</h1>
                  </div>
                  <div className="col-2">
                    <button
                      onClick={cleanOrderList}
                      className="btn btn-outline-warning"
                    >
                      Limpiar Lista
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">FECHA</th>
                      <th scope="col">CODIGO</th>
                      <th scope="col">DESCRIPCION</th>
                      <th scope="col">SOLICITO</th>
                      <th scope="col">CLIENTE</th>
                      <th scope="col">CANTIDAD</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 &&
                      products.map((product, index) => (
                        <tr key={`${product.codiart}-${index}`}>
                          <OrderListItem
                            product={product}
                            onHandleRemove={handleRemove}
                          />
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
