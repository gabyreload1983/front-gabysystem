import { useStockControl } from "../../hooks/useStockControl";
import { SwalToast } from "../../utils/alerts";
import { updateStockControlItem } from "../../utils/data";

export default function TableStockControl() {
  const { stockControl, getStockControlData } = useStockControl({
    status: "pending",
  });

  const columns = [
    {
      name: "#",
      code: "position",
      className: "text-uppercase tableHeaderSort d-none d-lg-table-cell",
    },
    {
      name: "codigo",
      code: "code",
      className: "text-uppercase tableHeaderSort",
    },
    {
      name: "descripcion",
      code: "description",
      className: "text-uppercase tableHeaderSort d-none d-lg-table-cell",
    },
    {
      name: "sistema",
      code: "quantitySystem",
      className: "text-uppercase tableHeaderSort",
    },
    {
      name: "fisico",
      code: "quantityReal",
      className: "text-uppercase tableHeaderSort",
    },
    {
      name: "accion",
      code: "",
      className: "text-uppercase tableHeaderSort",
    },
  ];

  const handleCheck = async ({ item }) => {
    item.status = "done";
    const response = await updateStockControlItem({ item });
    if (!response) return;
    await SwalToast("Se actualizo stock correctamente", 300);
    getStockControlData();
  };

  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover">
        <thead>
          <tr className="table-success">
            {columns.map((col) => (
              <th key={col.name} className={col.className}>
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stockControl.map((item, index) => (
            <tr key={item._id} className="table-dark">
              <td className="d-none d-lg-table-cell">{index + 1}</td>
              <td className="">{item.code}</td>
              <td className="d-none d-lg-table-cell">{item.description}</td>
              <td className="">{item.quantitySystem}</td>
              <td className="">{item.quantityReal}</td>
              <td className="">
                <button
                  onClick={() => handleCheck({ item })}
                  className="btn btn-sm btn-outline-info"
                >
                  Done
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
