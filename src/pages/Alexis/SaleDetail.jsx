import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { SwalError } from "../../utils";

export default function SaleDetail() {
  const { id } = useParams();
  const { logoutUserContext } = useContext(UserContext);
  const [sale, setSale] = useState(null);

  const getSaleDetail = async () => {
    try {
      const response = await axios.get(
        `http://${import.meta.env.VITE_URL_HOST}/api/sales-commissions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (response?.data?.payload) {
        const sale = response.data.payload;
        setSale(sale);
        console.log(sale);
      }
    } catch (error) {
      console.log(error);
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
    const { name, value } = event.target;
    setSale((prevSale) => ({
      ...prevSale,
      [name]: value,
    }));
  };

  return (
    <>
      <h2 className="text-center">DETALLE VENTA</h2>
      {sale && (
        <div className="row gap-2 justify-content-center">
          <div className="col-5 p-3 border rounded-3 bg-light">
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
              <label htmlFor="profit" className="me-3">
                RENTA:
              </label>
              <div>
                <span className="border border-2 p-1">$</span>
                <input
                  value={sale.profit}
                  name="profit"
                  id="profit"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="p-3 d-flex justify-content-between">
              <label htmlFor="stateInvoice" className="me-3">
                PAGO:
              </label>
              <input
                value={sale.stateInvoice}
                name="stateInvoice"
                id="stateInvoice"
                onChange={handleChange}
              />
            </div>
            <div className="p-3 d-flex justify-content-between">
              <label htmlFor="paymentDate" className="me-3">
                FECHA PAGO:
              </label>
              <input
                value={sale.paymentDate || ""}
                name="paymentDate"
                id="paymentDate"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-5 p-3 border rounded-3 bg-light">
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
                DELIVERY:
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
              <input
                value={sale.deliveryState}
                name="deliveryState"
                id="deliveryState"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-2 text-center">
              <button className="btn btn-info">GUARDAR</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
