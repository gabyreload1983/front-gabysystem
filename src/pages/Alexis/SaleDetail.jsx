import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import {
  SwalError,
  SwalToast,
  SwalWaiting,
  formatPrice,
  translateInvoiceState,
  translateDeliveryState,
  formatPaymentDate,
  isNotANumber,
  isLessThanZero,
  getJWT,
} from "../../utils";
import Swal from "sweetalert2";
import moment from "moment";
import { API_URL } from "../../constants";
import { getAlexisProfit } from "../../utils/alexis";

export default function SaleDetail() {
  const { id } = useParams();
  const { logoutUserContext } = useContext(UserContext);
  const [sale, setSale] = useState(null);

  const getSaleDetail = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/alexis/sales/${id}`, {
        headers: {
          Authorization: `Bearer ${getJWT()}`,
        },
      });

      if (response?.data?.payload) {
        const sale = response.data.payload;
        setSale(sale);
      }
    } catch (error) {
      SwalError(error);
      if (error?.response?.status === 403) {
        logoutUserContext();
      }
    }
  };

  const updateSale = async () => {
    try {
      const answer = await Swal.fire({
        text: `Guardar cambios?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });

      if (!answer.isConfirmed) return;
      if (
        isNotANumber(sale.deliveryCost) ||
        isLessThanZero(sale.deliveryCost)
      ) {
        return SwalError({
          message: "Ingrese un delivery igual o mayor a 0",
        });
      }

      if (isNotANumber(sale.profit) || sale.profit <= 0) {
        return SwalError({
          message: "Ingrese una renta mayor a 0",
        });
      }

      sale.paymentDate = moment(sale.paymentDate);

      const response = await axios.patch(
        `${API_URL}/api/alexis/sales`,
        { sale },
        {
          headers: {
            Authorization: `Bearer ${getJWT()}`,
          },
        }
      );

      SwalWaiting("Actualizando Datos...");

      if (response?.data?.status === "success") {
        SwalToast("Se actualizaron datos correctamente", 1000);
        getSaleDetail();
      }
    } catch (error) {
      SwalError(error);
      if (error?.response?.status === 403) {
        logoutUserContext();
      }
    }
  };

  useEffect(() => {
    getSaleDetail();
  }, [id]);

  const handleChange = (event) => {
    let { name, value } = event.target;
    setSale((prevSale) => ({
      ...prevSale,
      [name]: value,
    }));
  };

  const getSelectDeliveryState = (deliveryState) => {
    return deliveryState ? (
      <>
        <option value={true}>{translateDeliveryState(true)}</option>
        <option value={false}>{translateDeliveryState(false)}</option>
      </>
    ) : (
      <>
        <option value={false}>{translateDeliveryState(false)}</option>
        <option value={true}>{translateDeliveryState(true)}</option>
      </>
    );
  };

  const getSelectInvoiceState = (invoiceState) => {
    const states = ["pay", "pending", "toFree"];

    const mySet = new Set([invoiceState]);
    for (const state of states) mySet.add(state);
    const myArraySet = Array.from(mySet);

    return myArraySet.map((state) => (
      <option key={state} value={state}>
        {translateInvoiceState(state)}
      </option>
    ));
  };

  const cancelSale = async () => {
    try {
      const { isConfirmed, value: invoiceNumber } = await Swal.fire({
        title: `ANULAR FACTURA???`,
        text: `Esta acción NO se puede revertir!`,
        input: "text",
        inputLabel: "Ingrese numero de comprobante",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "Debe ingresar el numero de comprobante";
          }
          if (value !== sale.invoiceId) {
            return "Numero de comprobante incorrecto";
          }
        },
        confirmButtonText: "Aceptar",
      });

      if (!isConfirmed) return;

      const response = await axios.patch(
        `${API_URL}/api/alexis/sales`,
        { sale: { ...sale, isValid: false } },
        {
          headers: {
            Authorization: `Bearer ${getJWT()}`,
          },
        }
      );

      SwalWaiting("Actualizando Datos...");

      if (response?.data?.status === "success") {
        SwalToast("Se cancelo la factura!", 1000);
        getSaleDetail();
      }
    } catch (error) {
      SwalError(error);
      if (error?.response?.status === 403) {
        logoutUserContext();
      }
    }
  };

  if (sale && !sale?.isValid) return <h2>Factura Anulada</h2>;

  return (
    <>
      <h2 className="text-center">DETALLE VENTA</h2>
      {sale && (
        <div className="row gap-2 justify-content-center">
          <div className="col-12 col-lg-5 p-3 border rounded-3 bg-light">
            <div className="p-3 d-flex justify-content-between">
              <label htmlFor="invoiceId" className="me-3">
                COMPROBANTE:
              </label>
              <input
                value={sale.invoiceId}
                name="invoiceId"
                id="invoiceId"
                disabled
              />
            </div>
            <div className="p-3 d-flex justify-content-between">
              <label htmlFor="date" className="me-3">
                FECHA:
              </label>
              <input
                value={sale.date.slice(0, 10)}
                name="date"
                id="date"
                disabled
              />
            </div>
            <div className="p-3 d-flex justify-content-between">
              <label htmlFor="customer" className="me-3">
                CLIENTE:
              </label>
              <input
                value={sale.customer}
                name="customer"
                id="customer"
                disabled
              />
            </div>

            <div className="p-3 d-flex justify-content-between">
              <label htmlFor="saler" className="me-3">
                VENDEDOR:
              </label>
              <input value={sale.saler} name="saler" id="saler" disabled />
            </div>
            <div className="p-3 d-flex justify-content-between">
              <label htmlFor="total" className="me-3">
                TOTAL:
              </label>
              <input
                value={formatPrice(sale.subTotal + sale.tax)}
                id="total"
                disabled
              />
            </div>
            <div className="p-3 d-flex justify-content-between">
              <label htmlFor="alexisProfit" className="me-3">
                RENTA ALEXIS:
              </label>
              <input
                value={formatPrice(getAlexisProfit(sale))}
                id="alexisProfit"
                disabled
              />
            </div>
            <div className="p-3 d-flex justify-content-between">
              <label htmlFor="profit" className="me-3">
                RENTA:
              </label>
              <div>
                <span className="border border-2 p-1">$</span>
                <input
                  value={formatPrice(sale.profit)}
                  name="profit"
                  id="profit"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="p-3 d-flex justify-content-between">
              <label htmlFor="invoiceState" className="me-3">
                PAGO:
              </label>
              <div>
                <select
                  value={sale.invoiceState}
                  name="invoiceState"
                  id="invoiceState"
                  onChange={handleChange}
                  className="form-select"
                >
                  {getSelectInvoiceState(sale.invoiceState)}
                </select>
              </div>
            </div>
            <div className="p-3 d-flex justify-content-between">
              <label htmlFor="paymentDate" className="me-3">
                FECHA PAGO:
              </label>
              <input
                value={formatPaymentDate(sale.paymentDate)}
                name="paymentDate"
                id="paymentDate"
                onChange={handleChange}
                type="date"
              />
            </div>
          </div>
          <div className="col-12 col-lg-5 p-3 border rounded-3 bg-light">
            <div className="row h-100">
              <div className="col-12">
                <div className="p-3 d-flex justify-content-between">
                  <label htmlFor="purchaseOrder" className="me-3">
                    ORDEN COMPRA:
                  </label>
                  <input
                    value={sale.purchaseOrder || " -"}
                    name="purchaseOrder"
                    id="purchaseOrder"
                    onChange={handleChange}
                  />
                </div>
                <div className="p-3 d-flex justify-content-between">
                  <label htmlFor="delivery" className="me-3">
                    FLETERO:
                  </label>
                  <input
                    value={sale.delivery || " -"}
                    name="delivery"
                    id="delivery"
                    onChange={handleChange}
                  />
                </div>
                <div className="p-3 d-flex justify-content-between">
                  <label htmlFor="deliveryCost" className="me-3">
                    IMPORTE:
                  </label>
                  <div>
                    <span className="border border-2 p-1">$</span>
                    <input
                      value={sale.deliveryCost}
                      name="deliveryCost"
                      id="deliveryCost"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="p-3 d-flex justify-content-between">
                  <label htmlFor="deliveryState" className="me-3">
                    ENTREGADO:
                  </label>
                  <div>
                    <select
                      onChange={handleChange}
                      className="form-select"
                      id="deliveryState"
                      name="deliveryState"
                      value={sale.deliveryState}
                    >
                      {getSelectDeliveryState(sale.deliveryState)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-12 align-self-end d-flex justify-content-between">
                <button onClick={cancelSale} className="btn btn-danger">
                  ANULAR
                </button>
                <button onClick={updateSale} className="btn btn-info">
                  GUARDAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
