import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <div className="a-container text-center p-2">
        <h1 className="display-4 text-light">{showGallery ? "My Albums" : "Camera"}</h1>
        <button
          className="btn btn-light mt-3"
          onClick={() => setShowGallery(!showGallery)}
        >
          {showGallery ? "Switch to Camera" : "Switch to Albums"}
        </button>
      </div>
      <div className="content-container">
        {showGallery ? (
          <Gallery images={images} onDelete={handleDelete} />
        ) : (
          <CameraView onCapture={handleCapture} setShowGallery={setShowGallery} />
        )}
      </div>
    </div>
  );
};

export default App;
