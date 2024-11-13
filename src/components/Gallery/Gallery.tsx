import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nodata from "../../assests/Gallery/noData.jpeg";
import Trash from "../../assests/Gallery/trash.png";
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
        <div className="no-data">
          <img height="100%" width="100%" src={Nodata} alt="Empty Gallery" />
        </div>
      ) : (
        <div className="g-container">
          {images.map((src, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "column" }}>
              <motion.div
                className="g-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="g-container-div">
                  <img
                    className="g-image"
                    src={src}
                    alt={`Captured image ${index}`}
                    onClick={() => openImageModal(src)}
                  />
                  <motion.div
                    className="delete-button"
                    onClick={() => onDelete(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <img src={Trash} alt="Delete icon" />
                  </motion.div>
                </div>
              </motion.div>
              <div className="g-index">Capture {index + 1}</div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="modal-overlay"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="hover-modal-content"
              onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={selectedImage}
                alt="Selected"
                className="modal-image"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }} // Zoom effect on hover within the modal
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
