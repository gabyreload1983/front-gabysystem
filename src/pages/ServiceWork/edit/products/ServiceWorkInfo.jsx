export default function ServiceWorkInfo({ order }) {
  return (
    <div className="p-3 bg-dark text-white rounded">
      <strong className="fs-3">{order.nrocompro}</strong>
      <p className="fs-3 fw-semibold m-0">
        {order.codigo} - {order.nombre}
      </p>

      <div className="d-flex justify-content-center gap-3 mb-3">
        <p className="m-0 bg-secondary px-3 rounded">
          Vendedor: {order.operador}
        </p>
        <p className="m-0 bg-secondary px-3 rounded">
          Tecnico: {order.tecnico}
        </p>
      </div>
    </div>
  );
}
