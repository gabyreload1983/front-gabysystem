export default function RmaList({ products }) {
  return (
    <div className="table-responsive">
      <table className="table table-dark">
        <thead>
          <tr>
            <th>CODIGO</th>
            <th>DESCRIPCION</th>
            <th>SERIE</th>
            <th>PROVEEDOR</th>
            <th>FECHA COMPRA</th>
            <th>ESTADO</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((product) => (
              <tr key={product.codigo}>
                <td>{product.codigo}</td>
                <td>{product.descrip}</td>
                <td>{product.serie}</td>
                <td>{product.supplier}</td>
                <td>{product.purchaseDate}</td>
                <td>{product.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
