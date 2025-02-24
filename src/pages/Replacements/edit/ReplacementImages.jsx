import { API_URL } from "../../../constants";

export default function ReplacementImages({ replacement }) {
  if (!replacement || !replacement.images.length) return;

  return (
    <div className="row border rounded">
      {replacement.images.map((image) => (
        <div key={replacement._id} className="col-12 col-md-6 col-lg-4 p-3">
          <img
            className="img-fluid img-replacement"
            src={`${API_URL}/replacements/${replacement._id}/${image}`}
            alt=""
          />
        </div>
      ))}
    </div>
  );
}
