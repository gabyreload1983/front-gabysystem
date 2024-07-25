export default function Diagnosis({ diagnosis }) {
  return (
    <div className="p-3 m-0 text-start border rounded-2 d-flex flex-column">
      <div className="d-flex justify-content-center">
        <strong className="bg-info px-3 py-1 rounded text-center">
          Diagnostico
        </strong>
      </div>
      <textarea
        defaultValue={diagnosis}
        className="form-control mt-2"
        rows="5"
        disabled
      ></textarea>
    </div>
  );
}
