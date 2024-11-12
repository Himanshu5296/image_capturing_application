import React, { useRef, useState, useEffect } from "react";
import "./CameraView.css";

interface CameraViewProps {
  onCapture: (image: string) => void;
  setShowGallery: (show: boolean) => void;
}

const CameraView: React.FC<CameraViewProps> = ({
  onCapture,
  setShowGallery,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState("16:9");

  const getAspectRatioDimensions = (ratio: string) => {
    switch (ratio) {
      case "16:9":
        return [1280, 720];
      case "4:3":
        return [1024, 768];
      case "1:1":
        return [720, 720];
      default:
        return [1280, 720];
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [facingMode, aspectRatio]);

  const startCamera = async () => {
    stopCamera();
    try {
      const [width2, height2] = getAspectRatioDimensions(aspectRatio);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: width2 },
          height: { ideal: height2 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      // Set canvas dimensions to match the video feed
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (context) {
        // Clear the canvas before drawing
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Apply zoom by scaling the canvas context
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        context.translate(centerX, centerY);
        context.scale(zoom, zoom);
        context.translate(-centerX, -centerY);

        // Draw the video frame onto the canvas with the zoom effect
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Capture the image
        const image = canvas.toDataURL('image/png');
        onCapture(image);
        setShowGallery(true);
      }
    }
  };

  return (
    <div className="camera-container" style={{ height: 450, margin: "auto" }}>
      <div className="camera-view">
        <video
          ref={videoRef}
          style={{ transform: `scale(${zoom})`,aspectRatio: aspectRatio.replace(':', '/'), }}
          className="camera-video"
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* Aspect Ratio Selector */}
        <div className="aspect-ratio-selector">
          <label>Aspect Ratio:</label>
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
          >
            <option value="16:9">16:9</option>
            <option value="4:3">4:3</option>
            <option value="1:1">1:1</option>
          </select>
        </div>

        {/* Zoom Controls */}
        <div className="zoom-controls">
          <button onClick={() => setZoom((prev) => Math.min(prev + 0.1, 3))}>
            +
          </button>
          <button onClick={() => setZoom((prev) => Math.max(prev - 0.1, 1))}>
            -
          </button>
        </div>

        {/* Capture Button */}
        <button className="capture-button" onClick={handleCapture}>
          Click
        </button>

        {/* Rotate Button (Icon) */}
        <button
          className="rotate-button"
          onClick={() =>
            setFacingMode(facingMode === "user" ? "environment" : "user")
          }
        >
          🔄
        </button>
      </div>
    </div>
  );
};

export default CameraView;
