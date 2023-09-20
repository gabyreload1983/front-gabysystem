import React from "react";

export default function StatisticsDetail({ statistics }) {
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr className="table-success">
            <th scope="col">TECNICO</th>
            <th scope="col">TERMINADAS</th>
            <th scope="col">SIN REPARACION</th>
            <th scope="col">ARMADOS</th>
            <th scope="col">TICKETS</th>
            <th scope="col">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {statistics.length > 0 &&
            statistics.map((st) => (
              <tr key={st.code_technical}>
                <td>{st.code_technical}</td>
                <td>{st.finished}</td>
                <td>{st.withoutRepair}</td>
                <td>{st.assembly}</td>
                <td>{st.tickets}</td>
                <td className="table-secondary">{st.total}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
