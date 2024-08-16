import { useState } from "react";
import { searchSerie } from "../../utils/data";
import {
  formatDate,
  formatProductSerie,
  isInvalidChar,
  validateWarranty,
} from "../../utils/tools";

export default function SearchSerie() {
  const [serie, setSerie] = useState("");
  const [product, setProduct] = useState(null);

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (isInvalidChar(value)) return;

    setSerie(value);
  };

  const handleKeyDown = async (event) => {
    const keyCode = event.keyCode;
    if (keyCode === 13) handleSearch();
  };

  const handleSearch = async () => {
    if (serie.length < 5) return;
    const response = await searchSerie({ serie });

    setProduct(formatProductSerie(response));
  };

  return (
    <div className="container text-white bg-dark mt-3 rounded">
      <h2 className="text-center p-3">Buscar Numero de Serie</h2>
      <div className="row justify-content-center mb-2">
        <div className="col-12 col-lg-4 d-flex">
          <input
            className="form-control me-2"
            type="search"
            onChange={handleInputChange}
            name="search"
            onKeyDown={handleKeyDown}
            id="search"
            value={serie}
            placeholder="Ingrese numero de serie"
          />

          <button className="btn btn-outline-success" onClick={handleSearch}>
            Buscar
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">CODIGO</th>
              <th scope="col">DESCRIPCION</th>
              <th scope="col">PROVEEDOR</th>
              <th scope="col">FECHA COMPRA</th>
              <th scope="col">COMPROBANTE</th>
              <th scope="col">GARANTIA</th>
            </tr>
          </thead>
          <tbody>
            {product && (
              <tr>
                <td>{product.code}</td>
                <td>{product.description}</td>
                <td>{product.supplier}</td>
                <td>{formatDate(product.purchase_date)}</td>
                <td>{product.voucher}</td>
                <td>{validateWarranty(product.purchase_date) ? "SI" : "NO"}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
