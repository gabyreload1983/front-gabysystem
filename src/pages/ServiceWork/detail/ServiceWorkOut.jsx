export default function ServiceWorkOut({ order, serviceWorkOut }) {
  return (
    <button
      className="btn btn-danger"
      onClick={() => serviceWorkOut(order.nrocompro)}
    >
      Salida
    </button>
  );
}
