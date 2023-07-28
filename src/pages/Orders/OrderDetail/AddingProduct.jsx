import React, { useState } from "react";
import SearchProduct from "./../../../components/SearchProduct";
import AddingProductList from "./AddingProductList";

export default function AddingProduct({ onAddingProduct }) {
  const [products, setProducts] = useState([]);

  const handleChangeProducts = (products) => {
    setProducts(products);
  };
  return (
    <div className="container">
      <h1>Agregar Producto</h1>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-4">
          <SearchProduct onChangeProducts={handleChangeProducts} />
        </div>
        <div className="col-12">
          <AddingProductList
            products={products}
            onAddingProduct={onAddingProduct}
          />
        </div>
      </div>
    </div>
  );
}
