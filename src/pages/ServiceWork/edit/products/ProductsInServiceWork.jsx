import { formatPrice } from "../../../../utils/tools";

export default function ProductsInServiceWork({ order, deleteProduct }) {
  return (
    <div className="p-3 bg-dark rounded mt-2">
      <div className="table-responsive">
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Descripcion</th>
              <th className="d-none d-md-table-cell">Serie</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {order.products.length > 0 &&
              order.products.map((product, index) => {
                return (
                  <tr
                    className="table-dark"
                    key={`${product.nrocompro}-${index}`}
                  >
                    <td>{product.codigo}</td>
                    <td>{product.descrip}</td>
                    <td className="d-none d-md-table-cell">{product.serie}</td>
                    <td className="custom-td text-end">
                      ${formatPrice(product.priceList1WithTax)}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteProduct(product)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
