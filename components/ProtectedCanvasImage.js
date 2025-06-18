'use client'; // This component requires browser events and APIs

import { useRef, useEffect } from 'react';

export default function ProtectedCanvasImage({ src, alt, className, ...props }) {
  const canvasRef = useRef(null);
  // We use a ref to hold the loaded image object to avoid reloading it
  const imageRef = useRef(null);

  // This effect handles the initial drawing of the image
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !src) return;

    const context = canvas.getContext('2d');
    const image = new window.Image();
    image.crossOrigin = "Anonymous"; // Important for loading images from a CMS/CDN

    image.onload = () => {
      // Set canvas dimensions to match the loaded image
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      // Draw the beautiful, real image
      context.drawImage(image, 0, 0);
      // Store the loaded image in our ref for later use
      imageRef.current = image;
    };

    image.src = src;

  }, [src]); // This effect re-runs if the image source changes

  // This function is the "switch" that blanks the canvas on right-click
  const handleContextMenu = (e) => {
    // We DON'T call e.preventDefault() because we want the menu to appear.
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    // Fill the entire canvas with white
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  // This function restores the original image when the mouse leaves
  const handleMouseOut = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    const context = canvas.getContext('2d');
    // Redraw the original image from our ref
    context.drawImage(image, 0, 0);
  };

  return (
    <canvas
      ref={canvasRef}
      className={className}
      // Add event handlers for the bait-and-switch
      onContextMenu={handleContextMenu}
      onMouseOut={handleMouseOut}
      // Accessibility: Tell screen readers this is an image
      role="img"
      aria-label={alt}
      {...props}
    />
  );
}