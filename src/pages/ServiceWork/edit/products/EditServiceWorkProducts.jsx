import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  SwalError,
  SwalSuccess,
  formatSerialNumber,
  getOrder,
  updateProductsInSeriveWork,
  validateSerieMatchProduct,
} from "../../../../utils";
import Loading from "../../../../components/Loading";
import ServiceWorkInfo from "./ServiceWorkInfo";
import SearchProducts from "./SearchProducts";
import ProductsList from "./ProductsList";
import ProductsInServiceWork from "./ProductsInServiceWork";
import Swal from "sweetalert2";
import { API_URL } from "../../../../constants";

export default function EditServiceWorkProducts() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [cancelButton, setCancelButton] = useState(true);
  const [confirmButton, setConfirmButton] = useState(true);

  const getData = async () => {
    const response = await getOrder({ id });
    setOrder(response);
  };

  const deleteProduct = async (product) => {
    const updatedProducts = [...order.products];
    const index = updatedProducts.findIndex((p) => p.serie === product.serie);
    updatedProducts.splice(index, 1);

    setOrder((prev) => ({ ...prev, products: updatedProducts }));

    const indexStock = products.findIndex((p) => p.codigo === product.codigo);
    if (indexStock !== -1) {
      const productsSearchCopy = [...products];
      productsSearchCopy[indexStock].stockd01 =
        Number(productsSearchCopy[indexStock].stockd01) + 1;

      setProducts(productsSearchCopy);
    }

    setConfirmButton(false);
    setCancelButton(false);
  };

  const addProduct = async (product) => {
    const copyProduct = { ...product };
    let serie = "";
    if (copyProduct.trabaserie === "S") {
      let { value } = await Swal.fire({
        input: "text",
        inputLabel: "Ingrese Nº Serie",
        inputPlaceholder: "Numero de Serie",
        showCancelButton: true,
      });

      if (!value) {
        return;
      }

      value = formatSerialNumber(value);

      const repeat = order.products.some((p) => p.serie === value);
      if (repeat) {
        await SwalError({
          message: `El serie ya existe en esta orden de trabajo`,
        });
        return;
      }

      const isValid = await validateSerieMatchProduct(copyProduct, value);
      if (!isValid) return;

      serie = value;
    }
    copyProduct.serie = serie;

    const updatedProducts = [...order.products];
    updatedProducts.push(copyProduct);

    setOrder((prev) => ({ ...prev, products: updatedProducts }));
    setProducts((prev) =>
      prev.map((p) => {
        if (p.codigo === product.codigo) {
          const pCopy = { ...p };
          pCopy.stockd01 -= 1;
          return pCopy;
        }
        return p;
      })
    );
    setConfirmButton(false);
    setCancelButton(false);
  };

  const handleSearchPoducts = (products) => {
    setProducts(products);
  };

  const handleConfirm = async () => {
    const question = await Swal.fire({
      text: `Guardar cambios en orden ${order.nrocompro}?`,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    });
    if (!question.isConfirmed) return;

    await updateProductsInSeriveWork(order);
    setCancelButton(true);
    setConfirmButton(true);
    await getData();

    if (order.products.length === 0) {
      return SwalSuccess("Cambios guardados con exito! Orden sin productos");
    }

    await Swal.fire({
      icon: "success",
      text: `Cambios guardados con exito!`,
      position: "center",
      showConfirmButton: true,
      confirmButtonText: "Abrir PDF",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    window.open(
      `${API_URL}/pdfHistory/orders/${order.nrocompro}.pdf`,
      "_blank"
    );
  };

  const handleCancel = async () => {
    const question = await Swal.fire({
      text: `Cancelar cambios en orden ${order.nrocompro}?`,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    });
    if (!question.isConfirmed) return;

    getData();
    setCancelButton(true);
    setConfirmButton(true);
    setProducts([]);
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
          <ProductsInServiceWork order={order} deleteProduct={deleteProduct} />
          <div className="d-flex mt-3 gap-3">
            <button
              onClick={handleConfirm}
              disabled={confirmButton}
              className="btn btn-success"
            >
              Confirmar
            </button>
            <button
              onClick={handleCancel}
              disabled={cancelButton}
              className="btn btn-danger"
            >
              Cancelar
            </button>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="p-3 bg-dark text-white rounded">
            <SearchProducts handleSearchPoducts={handleSearchPoducts} />
            <ProductsList products={products} addProduct={addProduct} />
          </div>
        </div>
      </div>
    </div>
  );
}
