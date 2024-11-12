import { useState } from "react";
import SearchProducts from "../../components/Products/SearchProducts";
import ProductsList from "./ProductsList";
import { NavLink } from "react-router-dom";
import { filterProductsByStock } from "../../utils/tools";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [stock, setStock] = useState(true);

  const handleSearchPoducts = (products) => {
    setProducts(products);
    setProductsFiltered(filterProductsByStock(products, stock));
  };

  const handleCheck = () => {
    setStock((prev) => !prev);
    setProductsFiltered(filterProductsByStock(products, !stock));
  };

  return (
    <div className="container mt-3 bg-dark text-white rounded p-3 ">
      <NavLink className="btn btn-success mb-2" to="serie">
        SERIE
      </NavLink>
      <div className="row">
        <div className="col-12 col-lg-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              checked={stock}
              onChange={handleCheck}
            />
            <label className="form-check-label" htmlFor="flexCheckChecked">
              Stock
            </label>
          </div>
          <SearchProducts handleSearchPoducts={handleSearchPoducts} />
        </div>
        <div className="col-12">
          <ProductsList products={productsFiltered} />
        </div>
      </div>
    </div>
  );
}
