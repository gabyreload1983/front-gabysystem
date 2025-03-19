export default function TableBody({ data }) {
  const handleClick = (id) => {
    console.log(id);
  };

  return (
    <tbody>
      {data.map((item, index) => (
        <tr key={item._id} className="table-dark">
          <td>{index + 1}</td>
          <td className="">{item.code}</td>
          <td className="d-none d-lg-table-cell">{item.description}</td>
          <td className="">{item.quantitySystem}</td>
          <td className="">{item.quantityReal}</td>
          <td className="">
            <button
              onClick={() => handleClick({ id: _id })}
              className="btn btn-sm btn-outline-danger"
            >
              x
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
