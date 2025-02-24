import moment from "moment";
import { formatPrice, getReplacementStatus } from "../../utils/tools";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function TableBody({ data }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/replacements/edit/${id}`);
  };

  return (
    <tbody>
      {data.map((item, index) => (
        <tr key={item._id} className="table-dark" title={`NOTA: ${item.notes}`}>
          <td>{index + 1}</td>
          <td className="d-none d-lg-table-cell">
            {moment(item.createdAt).format("DD-MM-YYYY")}
          </td>
          <td className="d-none d-lg-table-cell">{item.orderNumber}</td>
          <td className="d-none d-lg-table-cell">{item.requests}</td>
          <td className="d-none d-lg-table-cell">{item.description}</td>
          <td className="d-none d-lg-table-cell">{item.supplier}</td>
          <td className="d-none d-lg-table-cell">${formatPrice(item.cost)}</td>
          <td className="d-none d-lg-table-cell">
            ${formatPrice(item.finalPrice)}
          </td>
          <td className="d-none d-lg-table-cell">{item.delay}</td>
          <td className="d-none d-lg-table-cell">
            {item.customerConfirmation ? "SI" : "NO"}
          </td>
          <td className="d-none d-lg-table-cell">
            {getReplacementStatus(item.status)}
          </td>
          <td className="d-none d-lg-table-cell">
            <a
              href={item.linkSupplier}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link
            </a>
          </td>
          <td className="d-none d-lg-table-cell">
            <PencilIcon
              onClick={() => handleClick(item._id)}
              className="iconTable cursor-pointer"
            />{" "}
          </td>
        </tr>
      ))}
    </tbody>
  );
}
