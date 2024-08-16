import { useEffect, useState } from "react";
import RmaList from "./RmaList";
import { getRmaProducts } from "../../utils/data";

export default function Rma() {
  const [products, setProducts] = useState([]);

  const getData = async () => {
    const data = await getRmaProducts();
    setProducts(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container-fluid bg-dark text-white mt-3">
      <h2 className="text-center">RMA</h2>
      <RmaList products={products} />
    </div>
  );
}
