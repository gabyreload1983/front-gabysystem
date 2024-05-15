import StatisticsDetail from "./StatisticsDetail";

export default function StatisticsTable({ statistics }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr className="table-success">
            <th scope="col">TECNICO</th>
            <th scope="col">TERMINADAS</th>
            <th scope="col">SIN REPARACION</th>
            <th scope="col">ARMADOS</th>
            <th scope="col">TICKETS</th>
            <th scope="col">TOTAL</th>
            <th scope="col">Detalle</th>
          </tr>
        </thead>
        <tbody>
          {statistics.length > 0 &&
            statistics.map((technicalStatistics) => (
              <tr key={technicalStatistics.code_technical}>
                <td>{technicalStatistics.code_technical}</td>
                <td>{technicalStatistics.finished}</td>
                <td>{technicalStatistics.withoutRepair}</td>
                <td>{technicalStatistics.assembly}</td>
                <td>{technicalStatistics.tickets}</td>
                <td className="table-secondary">{technicalStatistics.total}</td>
                <td>
                  <StatisticsDetail technicalStatistics={technicalStatistics} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
