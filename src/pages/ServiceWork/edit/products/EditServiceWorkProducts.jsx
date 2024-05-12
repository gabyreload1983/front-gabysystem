import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatPrice, getOrder } from "../../../../utils";
import Loading from "../../../../components/Loading";
import ServiceWorkInfo from "./ServiceWorkInfo";

export default function EditServiceWorkProducts() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const getData = async () => {
    const response = await getOrder({ id });
    setOrder(response);
  };

  const deleteProduct = async (serie) => {
    const updatedProducts = order.products.filter(
      (product) => product.serie !== serie
    );

    setOrder((prev) => ({ ...prev, products: updatedProducts }));
  };

  useEffect(() => {
    getData();
  }, []);

  if (!order) return <Loading />;

  return (
    <div className="container px-4 text-center">
      <div className="row g-3">
        <div className="col-12 col-lg-6">
          <ServiceWorkInfo order={order} />
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
                          <td className="d-none d-md-table-cell">
                            {product.serie}
                          </td>
                          <td className="custom-td text-end">
                            ${formatPrice(product.priceList1WithTax)}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => deleteProduct(product.serie)}
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
        </div>
        <div className="col-12 col-lg-6">
          <div className="p-3 bg-dark text-white rounded">Search Products</div>
        </div>
      </div>
    </div>
  );
}
