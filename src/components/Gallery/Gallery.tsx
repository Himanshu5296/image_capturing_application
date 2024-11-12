import React, { useState } from "react";
import Nodata from "../../assests/Gallery/noData.jpeg";
import Trash from "../../assests/Gallery/trash.png"
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
    <>
      {images.length === 0 ? (
        <div style={{height:"60vh",width:"40vh",margin:"auto"}}>
          <img style={{height:"100%",width:"100%"}} src={Nodata} alt="empty Gallery image" />
        </div>
      ) : (
        <div>
          <div className="g-container">
            {images.map((src, index) => (
              <div
                key={index}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div className="g-container-div">
                  <img
                    className="g-image"
                    src={src}
                    alt={`Captured image ${index}`}
                    onClick={() => openImageModal(src)}
                  />
                  <div
                    className="delete-button"
                    onClick={() => onDelete(index)}
                  >
                    <img height="100%" width="100%" src={Trash} alt="delete icon" />
                  </div>
                </div>
                <div style={{ margin: "auto" }}>{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for image */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Selected" className="modal-image" />
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
