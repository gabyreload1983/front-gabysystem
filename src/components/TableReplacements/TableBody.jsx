import moment from "moment";
import { formatPrice } from "../../utils/tools";

export default function TableBody({ data }) {
  return (
    <tbody>
      {data.map((item, index) => (
        <tr key={item._id} className="table-dark">
          <td>{index + 1}</td>
          <td className="d-none d-lg-table-cell">
            {moment(item.createdAt).format("DD-MM-YYYY")}
          </td>
          <td className="d-none d-lg-table-cell">{item.orderNumber}</td>
          <td className="d-none d-lg-table-cell">{item.technical_code}</td>
          <td className="d-none d-lg-table-cell">{item.description}</td>
          <td className="d-none d-lg-table-cell">{item.supplier}</td>
          <td className="d-none d-lg-table-cell">${formatPrice(item.cost)}</td>
          <td className="d-none d-lg-table-cell">
            ${formatPrice(item.finalPrice)}
          </td>
          <td className="d-none d-lg-table-cell">{item.delay}</td>
          <td className="d-none d-lg-table-cell">{item.shipmment}</td>
          <td className="d-none d-lg-table-cell">
            {item.customerConfirmation ? "Confirmed" : "Not Confirmed"}
          </td>
          <td className="d-none d-lg-table-cell">{item.status}</td>
          <td className="d-none d-lg-table-cell">
            <a
              href={item.linkSupplier}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
