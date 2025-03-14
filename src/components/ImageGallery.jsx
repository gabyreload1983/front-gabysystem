import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function ImageGallery({ images, photosUrl }) {
  if (!images) return;

  return (
    <PhotoProvider>
      <div className="image-grid">
        {images.map((image) => (
          <PhotoView key={image} src={`${photosUrl}${image}`}>
            <img
              src={`${photosUrl}${image}`}
              alt={`Imagen ${image}`}
              className="image"
            />
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
}
