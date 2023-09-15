import React from "react";
import { formatPrice, validateUserRole } from "../../../utils";

export default function ProductsInOrder({
  user,
  order,
  total,
  price,
  onDeletingProduct,
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
          <th></th>
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

              {validateUserRole(user, "technical") &&
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
          <td></td>
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
                {validateUserRole(user, "saler", "premium") &&
                order.estado === 22 ? (
                  <td className="d-flex justify-content-center align-items-center">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDeletingProduct(product)}
                    >
                      X
                    </button>
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
            );
          })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}>Total</td>
          <td className="custom-td text-end">${formatPrice(total)}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
}
