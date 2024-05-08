import TableBodySummaries from "./TableBodySummaries";
import TableHeader from "./TableHeader";

export default function TableSummaries({ columns, data }) {
  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover">
        <TableHeader columns={columns} />
        <TableBodySummaries data={data} />
      </table>
    </div>
  );
}
