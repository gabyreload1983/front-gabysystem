export default function StatisticsSector({ statistics, title }) {
  return (
    <div className="col-12 col-md-6 bg-dark text-white">
      <h2>{title}</h2>
      <p>Entraron: {statistics.in}</p>
      <p>
        Reparaon: {statistics.repair} {" >>> "}
        {((statistics.repair * 100) / statistics.in).toFixed(2)}%
      </p>
      <p>
        Pendinetes: {statistics.pending} {" >>> "}
        {((statistics.pending * 100) / statistics.in).toFixed(2)}%
      </p>
      <p>
        Retiraon: {statistics.out}
        {" >>> "}
        {((statistics.out * 100) / statistics.in).toFixed(2)}%
      </p>
      <p>
        No retiraron: {statistics.stay}
        {" >>> "}
        {((statistics.stay * 100) / statistics.in).toFixed(2)}%
      </p>
    </div>
  );
}
