import { formatPrice, getTotalOrder, validateUserRole } from "../../../utils";

export default function ServiceWorkProducts({ order }) {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Descripcion</th>
            <th className="d-none d-md-table-cell">Serie</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>.ST</td>
            <td>Mano de Obra</td>
            <td className="d-none d-md-table-cell"></td>
            <td className="custom-td text-end">${formatPrice(order.costo)}</td>
          </tr>
          {order.products.length > 0 &&
            order.products.map((product, index) => {
              return (
                <tr key={`${product.nrocompro}-${index}`}>
                  <td>{product.codigo}</td>
                  <td>{product.descrip}</td>
                  <td className="d-none d-md-table-cell">{product.serie}</td>
                  <td className="custom-td text-end">
                    ${formatPrice(product.priceList1WithTax)}
                  </td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td className="d-none d-md-table-cell"></td>
            <td className="custom-td text-end">${getTotalOrder(order)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
