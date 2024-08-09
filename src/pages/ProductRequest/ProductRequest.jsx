import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { SwalQuestion, SwalToast } from "../../utils/alerts";
import ProductRequestList from "./ProductRequestList";
import {
  cleanProductRequestList,
  getProductRequest,
  removeProductRequest,
} from "../../utils/data";

export default function ProductRequest() {
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState([]);

  const getData = async () => {
    setLoader(true);
    const data = await getProductRequest();
    setLoader(false);
    setProducts(data);
  };

  const handleClean = async () => {
    const confirm = await SwalQuestion(`Queres limpiar la lista???`);
    if (!confirm) return;

    const response = await cleanProductRequestList();
    if (!response) return;
    await getData();
    SwalToast("Se limpio la lista!", 500);
  };

  const handleRemove = async (code) => {
    const response = await removeProductRequest(code);
    if (!response) return;
    await getData();
    SwalToast("Item borrado!", 500);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container-fluid">
      {loader && <BarLoader color="#36d7b7" cssOverride={{ width: "100%" }} />}
      <div className="d-flex justify-content-around my-2 align-items-center">
        <h1 className="m-0">Productos Pedidos: {products.length}</h1>
        <button onClick={handleClean} className="btn btn-outline-warning">
          Limpiar Lista
        </button>
      </div>
      <ProductRequestList products={products} onHandleRemove={handleRemove} />
    </div>
  );
}
