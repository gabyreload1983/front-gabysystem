import { useState } from "react";
import { SwalError, SwalSuccess } from "../../../utils/alerts";
import { API_URL } from "../../../constants";

export default function UploadImagesReplacement({ replacement }) {
  const [files, setFiles] = useState([]);

  const handleChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
    } else {
      console.error("No files selected");
    }
  };
  const handleUpload = async () => {
    if (files.length === 0) {
      console.error("No files selected");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("imagesReplacement", file));

    const response = await fetch(
      `${API_URL}/api/replacements/images/${replacement._id}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response) return SwalError("Error subiendo fotos");

    SwalSuccess("Se subieron las fotos con exito!!");
  };
  return (
    <>
      <div className="border rounded mb-3 input-group">
        <input
          className="form-control"
          type="file"
          accept="image/*"
          multiple
          onChange={handleChange}
        />
        <button class="btn btn-success" onClick={handleUpload}>
          Subir Imágenes
        </button>
      </div>

      {/* <div className="border rounded">
      <input type="file" accept="image/*" multiple onChange={handleChange} />
      <button onClick={handleUpload}>Subir Imágenes</button>
    </div> */}
    </>
  );
}
