export default function TableBodySummaries({ data }) {
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.codigo} className="table-dark">
          <td>{item.codigo}</td>
          <td>{item.nombre}</td>
          <td>{item.balance}</td>
          <td>{item.balance}</td>
          <td>{item.condicion}</td>
          <td>{item.mail}</td>
        </tr>
      ))}
    </tbody>
  );
}
