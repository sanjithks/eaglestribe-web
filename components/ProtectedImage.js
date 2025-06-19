// @/components/ProtectedImage.js
'use client';

import { useRef, useEffect } from 'react';

export default function ProtectedImage({ src, alt, ...props }) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !src) return;
    const context = canvas.getContext('2d');
    const image = new window.Image();
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.drawImage(image, 0, 0); // Draw the image clear by default
      imageRef.current = image;
    };
    image.src = src;
  }, [src]);

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent the default menu
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleMouseLeave = () => {
    // Restore the image if it was blanked
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
  };

  return (
    <canvas
      ref={canvasRef}
      onContextMenu={handleContextMenu}
      onMouseLeave={handleMouseLeave}
      role="img"
      aria-label={alt}
      {...props}
    />
  );
}