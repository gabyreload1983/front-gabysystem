import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { SwalQuestion, SwalToast } from "../../utils/alerts";
import ProductRequestList from "./ProductRequestList";
import {
  cleanProductRequestList,
  getProductRequest,
  removeProductRequest,
} from "../../utils/data";
import { sortCodeString, sortItems } from "../../utils/tools";
import { TABLE_HEADER_PRODUCTS_REQUEST } from "../../constants";

export default function ProductRequest() {
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const [tableHeader, setTableHeaders] = useState(
    TABLE_HEADER_PRODUCTS_REQUEST
  );

  const getData = async () => {
    setLoader(true);
    const data = await getProductRequest();
    setLoader(false);
    setProducts(sortItems(data, "fecha", false));
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

  const handleSelected = (code) => {
    const index = tableHeader.findIndex((th) => th.code === code);
    const newTableHeader = tableHeader.map((th) => {
      if (th.code === code) {
        th.selected = true;
        th.order = !th.order;
        return th;
      }
      th.selected = false;
      return th;
    });

    setTableHeaders([...newTableHeader]);

    if (code === "codiart")
      return setProducts(
        sortCodeString(products, code, !tableHeader[index].order)
      );

    setProducts(sortItems(products, code, !tableHeader[index].order));
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
      <ProductRequestList
        products={products}
        onHandleRemove={handleRemove}
        tableHeader={tableHeader}
        onHandleSelected={handleSelected}
      />
    </div>
  );
}
