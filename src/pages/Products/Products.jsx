import { useState } from "react";
import SearchProducts from "../../components/Products/SearchProducts";
import ProductsList from "./ProductsList";

export default function Products() {
  const [products, setProducts] = useState([]);

  const handleSearchPoducts = (products) => {
    setProducts(products);
  };

  return (
    <div className="container mt-3">
      <div className="row p-3 bg-dark text-white rounded">
        <div className="col-12 col-lg-4">
          <SearchProducts handleSearchPoducts={handleSearchPoducts} />
        </div>
        <div className="col-12">
          <ProductsList products={products} />
        </div>
      </div>
    </div>
  );
}
