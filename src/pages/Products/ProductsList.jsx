import { requestProduct } from "../../utils/data";
import { formatPrice, getStock } from "../../utils/tools";
import {
  SwalActionInputsRequestProduct,
  SwalActionInputsStockControl,
  SwalError,
  SwalToast,
} from "../../utils/alerts";

export default function ProductsList({ products }) {
  const handleRequestProduct = async (product) => {
    const { quantity, customerCode, observation } =
      await SwalActionInputsRequestProduct(product);
    if (!quantity) return SwalError("Debe ingresar la cantidad");

    const response = await requestProduct(
      product,
      quantity,
      customerCode,
      observation
    );
    if (!response) return;
    await SwalToast("Se solicito el producto correctamente");
  };

  const handleStockControl = async ({ product }) => {
    const { quantityReal } = await SwalActionInputsStockControl({ product });
    if (!quantityReal && quantityReal !== 0)
      return SwalError("Debe ingresar la cantidad mayor o igual a 0");

    console.log(quantityReal);

    // const response = await requestProduct(
    //   product,
    //   quantity,
    //   customerCode,
    //   observation
    // );
    // if (!response) return;
    // await SwalToast("Se solicito el producto correctamente");
  };

  return (
    <div className="table-responsive">
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">CODIGO</th>
            <th scope="col">DESCRIPCION</th>
            <th scope="col">STOCK</th>
            <th scope="col">PRECIO FINAL</th>
            <th scope="col">PEDIR</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((product) => (
              <tr key={product.codigo}>
                <td>{product.codigo}</td>
                <td>{product.descrip}</td>
                <td>{getStock(product)}</td>
                <td>${formatPrice(product.priceList1WithTax)}</td>
                <td>
                  <button
                    onClick={() => handleRequestProduct(product)}
                    className="btn btn-sm btn-success"
                  >
                    +
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleStockControl({ product })}
                    className="btn btn-sm btn-success"
                  >
                    Stock
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
