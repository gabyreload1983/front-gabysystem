import React from "react";
import ProductDetail from "../../Products/ProductDetail";

export default function AddingProductList({ products, onAddingProduct }) {
  const styleProductItem = { cursor: "pointer" };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">CODIGO</th>
                <th scope="col">DESCRIPCION</th>
                <th scope="col">STOCK</th>
                <th scope="col">PRECIO FINAL</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                products.map((product) => (
                  <tr
                    key={product.codigo}
                    onClick={() => onAddingProduct(product)}
                    style={styleProductItem}
                  >
                    <ProductDetail product={product} />
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
