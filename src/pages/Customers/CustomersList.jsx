export default function CustomersList({ customers, onHandleCustomerSelected }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr className="table-success">
            <th scope="col">CODIGO</th>
            <th scope="col">DESCRIPCION</th>
            <th scope="col">EMAIL</th>
            <th scope="col">DIRECCION</th>
            <th scope="col">TELEFONO</th>
          </tr>
        </thead>
        <tbody>
          {customers?.length > 0 &&
            customers.map((customer) => (
              <tr
                key={customer.codigo}
                onClick={() => onHandleCustomerSelected(customer)}
                className="cursor-pointer"
              >
                <td>{customer.codigo}</td>
                <td>{customer.nombre}</td>
                <td>{customer.mail}</td>
                <td>{customer.direccion}</td>
                <td>{customer.telefono}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
