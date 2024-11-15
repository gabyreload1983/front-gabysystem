import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export default function Table({ columns, data, sortDataBy, sortData }) {
  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover">
        <TableHeader
          columns={columns}
          sortDataBy={sortDataBy}
          sortData={sortData}
        />
        <TableBody data={data} />
      </table>
    </div>
  );
}
