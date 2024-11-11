import React, { useState } from "react";
import "./App.css";
import CameraView from "./components/Camera/CameraView";
import Gallery from "./components/Gallery/Gallery";

const App: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [showGallery, setShowGallery] = useState<boolean>(true);
  const handleCapture = (image: string) => {
    setImages((prev) => [...prev, image]);
  };

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i != index));
  };

  return (
    <div className="App">
      <div className="a-container">
        <h1>{showGallery ? "Gallery" : "Camera"}</h1>
        <div>
          <button onClick={() => setShowGallery(!showGallery)}>
            {showGallery ? "Camera" : "Gallery"}
          </button>
        </div>
      </div>
      {showGallery ? (
        <Gallery images={images} onDelete={handleDelete} />
      ) : (
        <CameraView onCapture={handleCapture} setShowGallery={setShowGallery} />
      )}
    </div>
  );
};

export default App;
