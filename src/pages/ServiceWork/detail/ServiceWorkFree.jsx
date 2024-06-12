export default function ServiceWorkFree({ order, serviceWorkFree }) {
  return (
    <button
      className="btn btn-warning ms-auto"
      onClick={() => serviceWorkFree(order.nrocompro)}
    >
      Liberar
    </button>
  );
}
