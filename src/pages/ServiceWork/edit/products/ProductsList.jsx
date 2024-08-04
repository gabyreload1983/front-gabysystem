import { formatPrice } from "../../../../utils/tools";

export default function ProductsList({ products, addProduct }) {
  return (
    <div className="table-responsive">
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">CODIGO</th>
            <th scope="col">DESCRIPCION</th>
            <th scope="col">STOCK</th>
            <th scope="col">PRECIO FINAL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((product) => (
              <tr key={product.codigo}>
                <td>{product.codigo}</td>
                <td>{product.descrip}</td>
                <td>{product.stockd01 - product.reserd01}</td>
                <td>${formatPrice(product.priceList1WithTax)}</td>
                <td>
                  <button
                    onClick={() => addProduct(product)}
                    className="btn btn-sm btn-success"
                    disabled={product.stockd01 - product.reserd01 <= 0}
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
