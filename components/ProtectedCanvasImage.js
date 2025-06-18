'use client';

import { useRef, useEffect } from 'react';

export default function ProtectedCanvasImage({ src, alt, className, ...props }) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const audioRef = useRef(null);

  // This effect handles drawing the image and initializing the audio
  useEffect(() => {
    // --- Initialize Audio ---
    if (!audioRef.current) {
        audioRef.current = new Audio('/sounds/engine-rev.mp3'); // Ensure this path is correct
        audioRef.current.volume = 0.6;
    }

    // --- Draw Image ---
    const canvas = canvasRef.current;
    if (!canvas || !src) return;
    const context = canvas.getContext('2d');
    const image = new window.Image();
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.drawImage(image, 0, 0);
      imageRef.current = image;
    };
    image.src = src;

  }, [src]);

  const handleInteractionStart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Rewind to start
      audioRef.current.play();
    }
  };

  const handleContextMenu = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleMouseOut = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
  };

  return (
    <canvas
      ref={canvasRef}
      className={className}
      onContextMenu={handleContextMenu}
      onMouseLeave={handleMouseOut}
      onMouseDown={handleInteractionStart}
      onTouchStart={handleInteractionStart}
      role="img"
      aria-label={alt}
      {...props}
    />
  );
}