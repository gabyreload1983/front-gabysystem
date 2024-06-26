import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function TableHeader({ columns, sortDataBy, sortData }) {
  const [selected, setSelected] = useState("balance");

  const handleClick = (col) => {
    setSelected(col.code);
    sortDataBy(col);
  };
  return (
    <thead>
      <tr className="table-success">
        {columns.map((col) => (
          <th
            onClick={() => handleClick(col)}
            key={col.name}
            className="text-uppercase tableHeaderSort"
          >
            {col.name}
            {col.sort}
            {selected === col.code &&
              (sortData.sort ? (
                <ArrowDownIcon className="iconTable" />
              ) : (
                <ArrowUpIcon className="iconTable" />
              ))}
          </th>
        ))}
      </tr>
    </thead>
  );
}
