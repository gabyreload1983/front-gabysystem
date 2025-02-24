import { useState } from "react";

export default function UploadImagesReplacement({ onHandleUpload }) {
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

    onHandleUpload(formData);
  };
  return (
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
  );
}
