export default function Fail({ fail }) {
  return (
    <div className="my-2 p-3 m-0 text-start border rounded-2 d-flex flex-column">
      <div className="d-flex justify-content-center">
        <strong className="bg-danger px-3 py-1 rounded text-center">
          FALLA
        </strong>
      </div>
      <textarea
        value={fail}
        className="form-control mt-2"
        rows="5"
        disabled
      ></textarea>
    </div>
  );
}
