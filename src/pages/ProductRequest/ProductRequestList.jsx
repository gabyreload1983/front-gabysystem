import moment from "moment";

export default function ProductRequestList({ products, onHandleRemove }) {
  return (
    <div className="table-responsive">
      <table className="table table-sm table-dark bg-dark">
        <thead>
          <tr>
            <th className="d-none d-lg-table-cell">FECHA</th>
            <th>CODIGO</th>
            <th>DESCRIPCION</th>
            <th className="d-none d-lg-table-cell">SOLICITO</th>
            <th className="d-none d-lg-table-cell">CLIENTE</th>
            <th>CANTIDAD</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((product, index) => (
              <tr key={`${product.codiart}-${index}`}>
                <td className="d-none d-lg-table-cell">
                  {moment(product.fecha).format("DD/MM/YYYY")}
                </td>
                <td>{product.codiart}</td>
                <td>{product.descart}</td>
                <td className="d-none d-lg-table-cell">{product.soliciton}</td>
                <td className="d-none d-lg-table-cell">{product.nombre}</td>
                <td>{Number(product.cantidad).toFixed()}</td>
                <td>
                  <button
                    onClick={() => onHandleRemove(product.codiart)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
