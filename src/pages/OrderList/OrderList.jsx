import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { BarLoader } from "react-spinners";
import OrderListItem from "./OrderListItem";
import { API_URL } from "../../constants";
import { SwalError, SwalQuestion, SwalToast } from "../../utils/alerts";
import { deleteToApi, getFromApi } from "../../utils/api";

export default function OrderList() {
  const navigate = useNavigate();
  const { logoutUserContext } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState([]);

  const getOrderList = async () => {
    try {
      setLoader(true);

      const response = await getFromApi(`${API_URL}/api/products/order-list`);

      setLoader(false);

      if (response.status === "success") setProducts(response.payload);
    } catch (error) {
      SwalError(error?.message);
    }
  };

  const cleanOrderList = async () => {
    try {
      const confirm = await SwalQuestion(`Queres limpiar la lista???`);
      if (!confirm) return;

      const response = await deleteToApi(
        `${API_URL}/api/products/clear-order-list`
      );

      if (response.status === "success") {
        getOrderList();
        SwalToast(response.message, 500);
      }
    } catch (error) {
      SwalError(error?.message);
    }
  };

  const handleRemove = async (code) => {
    try {
      const response = await deleteToApi(
        `${API_URL}/api/products/order-list/${code}`
      );

      if (response.status === "success") {
        getOrderList();
        return SwalToast(response.message, 300);
      }
    } catch (error) {
      SwalError(error?.message);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <div className="container">
      {loader && <BarLoader color="#36d7b7" cssOverride={{ width: "100%" }} />}
      <div className="d-flex justify-content-around my-2 align-items-center">
        <h1 className="m-0">Productos Pedidos: {products.length}</h1>
        <button onClick={cleanOrderList} className="btn btn-outline-warning">
          Limpiar Lista
        </button>
      </div>
      <div className="table-responsive">
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
  );
}
