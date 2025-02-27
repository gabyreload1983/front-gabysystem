import { useState } from "react";
import { SwalError } from "../../../utils/alerts";

export default function UploadImagesReplacement({ onHandleUpload }) {
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      return SwalError("Debe cargar al menos una foto.");
    }

    const formData = new FormData();
    images.forEach((image) => formData.append("imagesReplacement", image));

    await onHandleUpload(formData);
    setImages([]);
  };

  return (
    <div className="border rounded p-3 d-flex justify-content-center flex-column gap-2 mb-3">
      <input
        id="galleryInput"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="d-none"
      />
      <input
        id="cameraInput"
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        onChange={handleImageChange}
        className="d-none"
      />

      <label
        htmlFor="galleryInput"
        className="custom-file-button btn btn-primary"
      >
        📁 Seleccionar de Galería
      </label>

      <label
        htmlFor="cameraInput"
        className="custom-file-button btn btn-success d-md-none"
      >
        📸 Tomar Foto
      </label>

      <button className="btn btn-warning" onClick={handleUpload}>
        🚀 Subir Imágenes
      </button>

      <div className="preview">
        {images.map((image) => (
          <img
            key={image.name}
            src={URL.createObjectURL(image)}
            alt={`preview image`}
            className="p-1"
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 10,
            }}
          />
        ))}
      </div>
    </div>
  );
}
