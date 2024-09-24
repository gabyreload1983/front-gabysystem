import SendWhatsapp from "../../components/SendWhatsapp";

export default function CustomersList({ customers, onHandleCustomerSelected }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-dark bg-dark">
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
              <tr key={customer.codigo}>
                <td
                  onClick={() => onHandleCustomerSelected(customer)}
                  className="cursor-pointer"
                >
                  {customer.codigo}
                </td>
                <td
                  onClick={() => onHandleCustomerSelected(customer)}
                  className="cursor-pointer"
                >
                  {customer.nombre}
                </td>
                <td>{customer.mail}</td>
                <td>{customer.direccion}</td>
                <td className="d-flex">
                  <SendWhatsapp celphone={customer.telefono} />
                  <span>{customer.telefono}</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
