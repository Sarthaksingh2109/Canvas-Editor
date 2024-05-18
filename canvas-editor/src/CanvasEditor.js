import React, { useRef, useEffect, useState } from 'react';
import CanvasHandler from './CanvasHandler';  // Import CanvasHandler
import templateData from './templateData.json';

const CanvasEditor = () => {
  const canvasRef = useRef(null);
  const [captionText, setCaptionText] = useState(templateData.caption.text);
  const [ctaText, setCtaText] = useState(templateData.cta.text);
  const [bgColor, setBgColor] = useState('#0369A1');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const canvasHandler = new CanvasHandler(ctx, canvas);
    canvasHandler.init(templateData, bgColor, captionText, ctaText, image);
  }, [bgColor, captionText, ctaText, image]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="container mx-auto p-4">
      <canvas ref={canvasRef} width="1080" height="1080" style={{ width: '400px', height: '400px' }} />
      <div className="mt-4">
        <label className="block mb-2">Caption Text</label>
        <input
          type="text"
          value={captionText}
          onChange={(e) => setCaptionText(e.target.value)}
          className="border p-2 w-full"
        />
        <label className="block mt-4 mb-2">CTA Text</label>
        <input
          type="text"
          value={ctaText}
          onChange={(e) => setCtaText(e.target.value)}
          className="border p-2 w-full"
        />
        <label className="block mt-4 mb-2">Background Color</label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="border p-2 w-full"
        />
        <label className="block mt-4 mb-2">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 w-full"
        />
      </div>
    </div>
  );
};

export default CanvasEditor;
