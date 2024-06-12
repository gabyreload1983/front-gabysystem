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
  validateUserRole,
  getFromApi,
  getTotalOrder,
  putToApi,
  validateStatus,
  formatSerialNumber,
  validateFreeServiceWork,
} from "../../../utils";
import Swal from "sweetalert2";
import AddingProduct from "./AddingProduct";
import OrderDetailHeader from "./OrderDetailHeader";
import { BarLoader } from "react-spinners";
import { API_URL } from "../../../constants";

export default function OrderDetail() {
  const [loader, setLoader] = useState(false);
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

  const getOrder = async () => {
    try {
      setLoader(true);

      const response = await getFromApi(`${API_URL}/api/orders/${id}`);
      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

      if (response.status === "success") {
        const orderResponse = response.payload;
        setOrder(orderResponse);
        setDiagnosis(orderResponse.diagnostico);
        setPrice(Number(orderResponse.costo));
        setTotal(Number(orderResponse.total));
      }
    } catch (error) {
      SwalError(error);
    } finally {
      setLoader(false);
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

      setLoader(true);

      const response = await putToApi(`${API_URL}/api/orders/update`, {
        nrocompro: `${order.nrocompro}`,
        code_technical: `${user.code_technical}`,
        diagnostico: diagnosis,
        costo: price,
      });

      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

      if (response.status === "success") {
        await getOrder();
        SwalToast("Orden actualizada", 1000);
      }
    } catch (error) {
      SwalError(error);
    } finally {
      setLoader(false);
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

      setLoader(true);

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
        `${API_URL}/api/orders/close`,
        orderToClose
      );

      SwalWaiting("Cerrando Orden...");

      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

      if (response.status === "success") {
        await getOrder();

        SwalToast("Orden Cerrada exitosamente", 1500);
      }
    } catch (error) {
      SwalError(error);
    } finally {
      setLoader(false);
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

      setLoader(true);

      const response = await putToApi(
        `${API_URL}/api/orders/free`,
        orderToFree
      );

      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

      if (response.status === "success") {
        await getOrder();
        SwalToast("Orden Liberada exitosamente", 1000);
      }
    } catch (error) {
      SwalError(error);
    } finally {
      setLoader(false);
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

      setLoader(true);

      const response = await putToApi(`${API_URL}/api/orders/take`, {
        nrocompro: `${order.nrocompro}`,
        code_technical: `${user.code_technical}`,
      });

      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

      if (response.status === "success") {
        await getOrder();
        SwalToast("Orden tomada", 1000);
      }
    } catch (error) {
      SwalError(error);
    } finally {
      setLoader(false);
    }
  };

  //Saler

  const handleAddingProduct = async (product) => {
    try {
      setLoader(true);

      const copyProduct = { ...product };
      let serie = "";
      if (copyProduct.trabaserie === "S") {
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
          `${API_URL}/api/products/serie/${value}`
        );

        if (validateStatus(response) === "jwt-expired") {
          logoutUserContext();
          return navigate("/login");
        }

        if (response.status === "success") {
          if (response.payload.length) {
            const productFind = response.payload[0];
            if (copyProduct.codigo !== productFind.codigo)
              return await SwalError({
                message: `El serie pertenece al producto ${productFind.codigo}`,
              });
          }
        }
        serie = value;
      }

      copyProduct.serie = serie;
      order.products.push(copyProduct);
      order.total = getTotalOrder(order);

      setOrder((prev) => ({
        ...prev,
        products: order.products,
        total: order.total,
      }));

      setCancelButton(false);
      setConfirmButton(false);
    } catch (error) {
      SwalError(error);
    } finally {
      setLoader(false);
    }
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

      setLoader(true);

      SwalWaiting("Actualizando orden y enviando email");

      const response = await putToApi(`${API_URL}/api/orders/products`, order);

      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

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
          `${API_URL}/pdfHistory/${response.payload.fileName}`,
          "_blank"
        );
      }
    } catch (error) {
      SwalError(error);
    } finally {
      setLoader(false);
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

      const notification = await Swal.fire({
        text: `Notificar al cliente???`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });

      setLoader(true);

      const response = await putToApi(`${API_URL}/api/orders/out/${id}`, {
        notification: notification.isConfirmed,
      });

      if (validateStatus(response) === "jwt-expired") {
        logoutUserContext();
        return navigate("/login");
      }

      if (response.status === "success") {
        getOrder();
        SwalToast("Salida de orden exitosa!");
      }
    } catch (error) {
      SwalError(error);
    } finally {
      setLoader(false);
    }
  };

  const editCustomer = () => {
    navigate(`/orders/update-customer?orderId=${order.nrocompro}`);
  };

  useEffect(() => {
    getOrder();
  }, [id]);

  return (
    <>
      {order && (
        <div className="container my-3">
          {loader && (
            <BarLoader color="#36d7b7" cssOverride={{ width: "100%" }} />
          )}
          <button className="btn btn-outline-secondary" onClick={goBack}>
            volver
          </button>

          <h2>
            {order.codigo} - {order.nombre}
            {validateUserRole(user, "premium") && (
              <button
                className="btn btn-sm btn-outline-info ms-3"
                onClick={editCustomer}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </button>
            )}
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
                          className="form-control"
                          rows="5"
                          disabled={
                            user.code_technical !== order.tecnico ||
                            order.estado !== 22
                          }
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
            <div className="col-12 d-flex justify-content-between mb-3">
              {validateUserRole(user, "technical", "premium") &&
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
                {validateFreeServiceWork(user, order) && (
                  <button className="btn btn-warning" onClick={freeOrder}>
                    Liberar
                  </button>
                )}
                {validateUserRole(user, "technical", "premium") &&
                  order.estado === 21 && (
                    <button className="btn btn-success" onClick={takeOrder}>
                      Tomar
                    </button>
                  )}
              </div>
              <div className="row ms-3">
                <div className="col text-end">
                  {validateUserRole(user, "saler", "premium") &&
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
              {validateUserRole(user, "saler", "premium") &&
                order.estado === 22 && (
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
              {order.products.length > 0 && (
                <a
                  href={`${API_URL}/pdfHistory/${order.nrocompro}.pdf`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline-warning"
                >
                  PDF
                </a>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col">
              {validateUserRole(user, "saler", "premium") &&
                order.estado === 22 && (
                  <AddingProduct onAddingProduct={handleAddingProduct} />
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
