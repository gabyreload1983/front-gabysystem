import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/16/solid";
import moment from "moment";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { validateUserRole } from "../../utils/validation";

export default function ProductRequestList({
  products,
  onHandleRemove,
  tableHeader,
  onHandleSelected,
}) {
  const { user } = useContext(UserContext);
  return (
    <div className="table-responsive">
      <table className="table table-sm table-dark bg-dark">
        <thead>
          <tr>
            {tableHeader.map((th) => {
              if (!th.name) return <th key={th.id}></th>;

              const icon = th.order ? (
                <ArrowUpIcon className="iconTable" />
              ) : (
                <ArrowDownIcon className="iconTable" />
              );

              return (
                <th
                  key={th.id}
                  className={th.styles}
                  onClick={() => onHandleSelected(th.code)}
                >
                  {th.name}
                  {th.selected && icon}
                </th>
              );
            })}
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
                <td>{Number(product.cantidad).toFixed()}</td>
                <td className="d-none d-lg-table-cell">{product.soliciton}</td>
                <td className="d-none d-lg-table-cell">{product.nombre}</td>
                <td className="d-none d-lg-table-cell">{product.observa}</td>

                <td>
                  {validateUserRole(user, "premium") && (
                    <button
                      onClick={() => onHandleRemove(product.codiart)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      x
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
