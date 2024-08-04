import moment from "moment";
import { formatPrice } from "../../utils/tools";

export default function TableBodySummaries({ data }) {
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.codigo} className="table-dark">
          <td>{item.codigo}</td>
          <td>{item.nombre}</td>
          <td>${formatPrice(item.balance)}</td>
          <td>
            {item.lastPay ? moment(item.lastPay).format("DD-MM-YYYY") : "-"}
          </td>
          <td>{item.condicion}</td>
          <td>{item.mail}</td>
        </tr>
      ))}
    </tbody>
  );
}
