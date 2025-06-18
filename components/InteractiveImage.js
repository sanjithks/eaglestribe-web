'use client';

import { useRef, useEffect } from 'react';

// This component is now "controlled" by its parent.
// It receives `reveal` and `isRevealing` as props.
export default function InteractiveImage({ image, reveal, isRevealing }) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const MAX_BLUR = 16;

  // Effect to draw the initial image
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image.url) return;
    const context = canvas.getContext('2d');
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      imageRef.current = img;
      context.filter = `blur(${MAX_BLUR}px)`;
      context.drawImage(img, 0, 0);
    };
    img.src = image.url;
  }, [image.url]);

  // Effect to redraw the image whenever the REVEAL PROP changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const context = canvas.getContext('2d');
    const blurAmount = MAX_BLUR * (1 - reveal / 100);
    
    context.filter = `blur(${blurAmount}px)`;
    context.drawImage(img, 0, 0);
  }, [reveal]); // This now listens to the prop from the parent!

  // --- Right-Click Protection ---
  const handleContextMenu = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    context.filter = 'none';
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const needleAngle = -90 + (reveal / 100) * 180;

  return (
    <div
      className="w-full h-full relative"
      onContextMenu={handleContextMenu}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
      <div 
        className="absolute bottom-3 right-3 transition-opacity duration-300 pointer-events-none z-10"
        style={{ opacity: isRevealing ? 1 : 0.6 }}
      >
        <svg width="50" height="25" viewBox="0 0 100 50">
          <path d="M 10 50 A 40 40 0 0 1 90 50" stroke="#fff" strokeWidth="8" fill="none" opacity="0.4" strokeLinecap="round" />
          <line x1="50" y1="50" x2="50" y2="10" stroke="#ff4500" strokeWidth="8" strokeLinecap="round" style={{ transform: `rotate(${needleAngle}deg)`, transformOrigin: '50px 50px', transition: !isRevealing ? 'transform 0.4s ease-out' : 'none' }} />
        </svg>
      </div>
    </div>
  );
}