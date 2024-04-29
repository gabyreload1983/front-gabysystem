import ProductDetail from "./ProductDetail";

export default function ProductsList({ products }) {
  return (
    <div className="table-responsive">
      <h1>Lista de Productos</h1>
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
              <tr key={product.codigo}>
                <ProductDetail product={product} />
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
