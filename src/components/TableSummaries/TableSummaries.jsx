import TableBodySummaries from "./TableBodySummaries";
import TableHeader from "./TableHeader";

export default function TableSummaries({
  columns,
  data,
  sortDataBy,
  sortData,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover">
        <TableHeader
          columns={columns}
          sortDataBy={sortDataBy}
          sortData={sortData}
        />
        <TableBodySummaries data={data} />
      </table>
    </div>
  );
}
