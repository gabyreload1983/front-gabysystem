import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductsInOrder from "./ProductsInOrder";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import {
  SwalError,
  SwalSuccess,
  SwalToast,
  SwalWaiting,
  renderByRole,
  getFromApi,
  getTotalOrder,
  putToApi,
} from "../../../utils";
import Swal from "sweetalert2";
import { formatSerialNumber } from "../orderUtils";
import AddingProduct from "./AddingProduct";
import OrderDetailHeader from "./OrderDetailHeader";

export default function OrderDetail() {
  const { user, logoutUserContext } = useContext(UserContext);
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [cancelButton, setCancelButton] = useState(true);
  const [confirmButton, setConfirmButton] = useState(true);

  const [diagnosis, setDiagnosis] = useState(null);
  const [price, setPrice] = useState(null);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

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
    const response = await getFromApi(
      `http://${import.meta.env.VITE_URL_HOST}/api/orders/${id}`
    );
    validateResponse(response);

    if (response.status === "success") {
      const orderResponse = response.payload;
      setOrder(orderResponse);
      setDiagnosis(orderResponse.diagnostico);
      setPrice(Number(orderResponse.costo));
      setTotal(Number(orderResponse.total));
    }
  };

  // Technical

  const handleDiagnosis = (e) => {
    setDiagnosis(e.target.value);
  };

  const handlePrice = (e) => {
    const lastCharacter = Number(e.target.value[e.target.value.length - 1]);
    if (isNaN(lastCharacter)) return;

    setTotal((prevTotal) => {
      return prevTotal - price + Number(e.target.value);
    });
    setPrice(Number(e.target.value));
  };

  const updateOrder = async () => {
    try {
      const question = await Swal.fire({
        text: `Actualizar orden ${order.nrocompro}?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });
      if (!question.isConfirmed) return;
      const response = await putToApi(
        `http://${import.meta.env.VITE_URL_HOST}/api/orders/update`,
        {
          nrocompro: `${order.nrocompro}`,
          code_technical: `${user.code_technical}`,
          diagnostico: diagnosis,
          costo: price,
        }
      );

      validateResponse(response);

      if (response.status === "success") {
        await getOrder();
        SwalToast("Orden actualizada", 1000);
      }
    } catch (error) {
      SwalError(error);
    }
  };

  const closeOrder = async (diag) => {
    try {
      const orderToClose = {
        nrocompro: order.nrocompro,
        diagnostico: diagnosis,
        costo: price,
        code_technical: user.code_technical,
        diag,
      };
      const question = await Swal.fire({
        text: `Cerrar orden ${order.nrocompro}?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });
      if (!question.isConfirmed) return;

      const notification = await Swal.fire({
        text: `Enviar notificacion por email?`,
        showCancelButton: true,
        cancelButtonText: "Cerrar Sin Notificacion",
        confirmButtonText: "Cerrar y Enviar Email",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      if (notification.isConfirmed) orderToClose.notification = true;

      const response = await putToApi(
        `http://${import.meta.env.VITE_URL_HOST}/api/orders/close`,
        orderToClose
      );

      SwalWaiting("Cerrando Orden...");

      validateResponse(response);

      if (response.status === "success") {
        await getOrder();

        SwalToast("Orden Cerrada exitosamente", 1500);
      }
    } catch (error) {
      SwalError(error);
    }
  };

  const freeOrder = async () => {
    try {
      const orderToFree = {
        nrocompro: order.nrocompro,
        code_technical: user.code_technical,
      };
      const question = await Swal.fire({
        text: `Liberar orden ${order.nrocompro}?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });
      if (!question.isConfirmed) return;

      const response = await putToApi(
        `http://${import.meta.env.VITE_URL_HOST}/api/orders/free`,
        orderToFree
      );

      validateResponse(response);

      if (response.status === "success") {
        await getOrder();
        SwalToast("Orden Liberada exitosamente", 1000);
      }
    } catch (error) {
      SwalError(error);
    }
  };

  const takeOrder = async () => {
    try {
      const question = await Swal.fire({
        text: `Queres tomar la orden ${order.nrocompro}?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });
      if (!question.isConfirmed) return;

      const response = await putToApi(
        `http://${import.meta.env.VITE_URL_HOST}/api/orders/take`,
        {
          nrocompro: `${order.nrocompro}`,
          code_technical: `${user.code_technical}`,
        }
      );

      validateResponse(response);

      if (response.status === "success") {
        await getOrder();
        SwalToast("Orden tomada", 1000);
      }
    } catch (error) {
      SwalError(error);
    }
  };

  //Saler

  const handleAddingProduct = async (product) => {
    let serie = "";
    if (product.trabaserie === "S") {
      let { value } = await Swal.fire({
        input: "text",
        inputLabel: "Ingrese Nº Serie",
        inputPlaceholder: "Numero de Serie",
        showCancelButton: true,
      });

      if (!value) {
        return;
      }

      value = formatSerialNumber(value);

      const response = await getFromApi(
        `http://${import.meta.env.VITE_URL_HOST}/api/products/serie/${value}`
      );

      validateResponse(response);

      if (response.status === "success") {
        if (response.payload.length) {
          const productFind = response.payload[0];
          if (product.codigo !== productFind.codigo)
            return await SwalError({
              message: `El serie pertenece al producto ${productFind.codigo}`,
            });
        }
      }
      serie = value;
    }
    product.serie = serie;
    order.products.push(product);
    order.total = getTotalOrder(order);

    setOrder((prev) => ({
      ...prev,
      products: order.products,
      total: order.total,
    }));

    setCancelButton(false);
    setConfirmButton(false);
  };

  const handleDeletingProduct = (product) => {
    const index = order.products.findIndex(
      (p) => p.codigo === product.codigo && p.serie === product.serie
    );
    order.products.splice(index, 1);
    order.total = getTotalOrder(order);

    setOrder((prev) => ({
      ...prev,
      products: order.products,
      total: order.total,
    }));

    setCancelButton(false);
    setConfirmButton(false);
  };

  const handleConfirm = async () => {
    try {
      const question = await Swal.fire({
        text: `Guardar cambios en orden ${order.nrocompro}?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });
      if (!question.isConfirmed) return;

      SwalWaiting("Actualizando orden y enviando email");

      const response = await putToApi(
        `http://${import.meta.env.VITE_URL_HOST}/api/orders/products`,
        order
      );

      validateResponse(response);

      if (response.status === "success") {
        setCancelButton(true);
        setConfirmButton(true);
        getOrder();
        if (!order.products.length) {
          return SwalSuccess(
            "Cambios guardados con exito! Orden sin productos"
          );
        }

        await Swal.fire({
          icon: "success",
          text: `Cambios guardados con exito!`,
          position: "center",
          showConfirmButton: true,
          confirmButtonText: "Abrir PDF",
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        window.open(
          `http://${import.meta.env.VITE_URL_HOST}/pdfHistory/${
            response.payload.fileName
          }`,
          "_blank"
        );
      }
    } catch (error) {
      SwalError(error);
    }
  };

  const handleCancel = async () => {
    try {
      const question = await Swal.fire({
        text: `Cancelar cambios en orden ${order.nrocompro}?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });
      if (!question.isConfirmed) return;

      getOrder();
      setCancelButton(true);
      setConfirmButton(true);
    } catch (error) {
      SwalError(error);
    }
  };

  const outOrder = async (id) => {
    try {
      const question = await Swal.fire({
        text: `Queres dar salida a la orden ${order.nrocompro}?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });
      if (!question.isConfirmed) return;

      const response = await putToApi(
        `http://${import.meta.env.VITE_URL_HOST}/api/orders/out/${id}`
      );

      validateResponse(response);

      if (response.status === "success") {
        getOrder();
        SwalToast("Salida de orden exitosa!");
      }
    } catch (error) {
      SwalError(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, [id]);

  return (
    <>
      {order && (
        <div className="container my-3">
          <button className="btn btn-outline-secondary" onClick={goBack}>
            volver
          </button>

          <h2>
            {order.codigo} - {order.nombre}
          </h2>
          <h3>{order.nrocompro}</h3>

          <OrderDetailHeader order={order} />

          <div className="row">
            <div className="col-12">
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <div className="mb-3">
                        <label className="form-label">Diagnostico</label>
                        <textarea
                          value={diagnosis}
                          readOnly={!renderByRole(user, "technical")}
                          className="form-control"
                          rows="5"
                          disabled={!renderByRole(user, "technical")}
                          onChange={handleDiagnosis}
                        ></textarea>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <h3>DETALLE</h3>
              <ProductsInOrder
                user={user}
                order={order}
                total={total}
                price={price}
                onDeletingProduct={handleDeletingProduct}
                onHandlePrice={handlePrice}
              />
            </div>
            <div className="col-12 d-flex justify-content-between mb-3">
              {renderByRole(user, "saler") && order.estado === 22 && (
                <div className="btn-group">
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={handleConfirm}
                    disabled={confirmButton}
                  >
                    Confirmar
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={handleCancel}
                    disabled={cancelButton}
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col text-end">
              {renderByRole(user, "saler") &&
                order.ubicacion === 21 &&
                order.estado === 23 && (
                  <button
                    className="btn btn-danger"
                    onClick={() => outOrder(order.nrocompro)}
                  >
                    Salida
                  </button>
                )}
            </div>
          </div>

          <div className="row">
            <div className="col">
              {renderByRole(user, "saler") && order.estado === 22 && (
                <AddingProduct onAddingProduct={handleAddingProduct} />
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-12 d-flex justify-content-between mb-3">
              {renderByRole(user, "technical") &&
                order.estado === 22 &&
                order.tecnico === user?.code_technical && (
                  <div className="btn-group">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => closeOrder(22)}
                    >
                      Reparado
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => closeOrder(23)}
                    >
                      Sin Reparacion
                    </button>

                    <button
                      className="btn btn-sm btn-outline-info"
                      onClick={updateOrder}
                    >
                      Guardar
                    </button>
                  </div>
                )}

              <div className="col text-end">
                {renderByRole(user, "technical") &&
                  order.estado === 22 &&
                  order.tecnico === user?.code_technical && (
                    <button className="btn btn-warning" onClick={freeOrder}>
                      Liberar
                    </button>
                  )}
                {renderByRole(user, "technical") && order.estado === 21 && (
                  <button className="btn btn-success" onClick={takeOrder}>
                    Tomar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
