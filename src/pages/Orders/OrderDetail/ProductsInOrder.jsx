import React from "react";
import { formatPrice } from "../../../utils";
import { validateUserRole } from "../../../utils/validation";

export default function ProductsInOrder({
  user,
  order,
  total,
  price,
  onHandlePrice,
}) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Codigo</th>
          <th>Descripcion</th>
          <th>Serie</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>.ST</td>
          <td>Mano de Obra</td>
          <td></td>
          <td className="custom-td text-end input-price">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                $
              </span>

              {validateUserRole(user, "technical", "premium") &&
              user.code_technical === order.tecnico &&
              order.estado === 22 ? (
                <input
                  className="form-control"
                  type="text"
                  value={price}
                  onChange={onHandlePrice}
                />
              ) : (
                <input
                  className="form-control"
                  type="number"
                  value={formatPrice(price)}
                  disabled
                />
              )}
            </div>
          </td>
        </tr>
        {order.products.length > 0 &&
          order.products.map((product, index) => {
            return (
              <tr key={`${product.nrocompro}-${index}`}>
                <td>{product.codigo}</td>
                <td>{product.descrip}</td>
                <td>{product.serie}</td>
                <td className="custom-td text-end">
                  ${formatPrice(product.priceList1WithTax)}
                </td>
              </tr>
            );
          })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}>Total</td>
          <td className="custom-td text-end">${formatPrice(total)}</td>
        </tr>
      </tfoot>
    </table>
  );
}
