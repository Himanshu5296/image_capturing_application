import React, { useState } from "react";
import "./Gallery.css";

interface GalleryProps {
  images: string[];
  onDelete: (index: number) => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, onDelete }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImageModal = (src: string) => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="g-container">
        {images.map((src, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "column" }}>
            <div className="g-container-div">
              <img
                className="g-image"
                src={src}
                alt={`Captured image ${index}`}
                onClick={() => openImageModal(src)}
              />
              <button className="delete-button" onClick={() => onDelete(index)}>
                ×
              </button>
            </div>
            <div style={{ margin: "auto" }}>{index + 1}</div>
          </div>
        ))}
      </div>

      {/* Modal for image */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Selected" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
