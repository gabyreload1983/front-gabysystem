import React, { useState } from "react";
import SearchProduct from "../../components/SearchProduct";
import ProductsList from "./ProductsList";

export default function Products() {
  const [products, setProducts] = useState([]);

  const handleChangeProducts = (products) => {
    setProducts(products);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-4">
          <SearchProduct onChangeProducts={handleChangeProducts} />
        </div>
        <div className="col-12">
          <ProductsList products={products} />
        </div>
      </div>
    </div>
  );
}
