'use client';

import { useState, useRef, useEffect } from 'react';

// This is our single, definitive component for all interactive images.
// It has an `enableSound` prop which defaults to false (silent).
export default function InteractiveImage({ image, enableSound = false }) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const audioRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [reveal, setReveal] = useState(0);
  const startXRef = useRef(0);

  const MAX_BLUR = 16;

  // --- Initialize Image & Audio ---
  useEffect(() => {
    // Only initialize the audio object if sound is enabled for this instance
    if (enableSound && !audioRef.current) {
      audioRef.current = new Audio('/sounds/engine-rev.mp3');
    }

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
  }, [image.url, enableSound]);

  // --- Redraw image when blur changes ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const context = canvas.getContext('2d');
    const blurAmount = MAX_BLUR * (1 - reveal / 100);
    context.filter = `blur(${blurAmount}px)`;
    context.drawImage(img, 0, 0);
  }, [reveal]);

  // --- Event Handlers for Drag & Sound ---
  const handlePressStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.clientX || e.touches[0].clientX;
    // Play sound only if it's enabled for this component
    if (enableSound && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handlePressEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setReveal(0);
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches[0].clientX;
    const deltaX = currentX - startXRef.current;
    const percentage = Math.min(100, Math.max(0, (deltaX / 150) * 100));
    setReveal(percentage);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    context.filter = 'none';
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('mouseup', handlePressEnd);
      window.addEventListener('touchend', handlePressEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handlePressEnd);
      window.removeEventListener('touchend', handlePressEnd);
    };
  }, [isDragging]);

  const needleAngle = -90 + (reveal / 100) * 180;

  return (
    <div
      className="w-full h-full cursor-grab relative unselectable"
      onMouseDown={handlePressStart}
      onTouchStart={handlePressStart}
      onContextMenu={handleContextMenu}
    >
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
      <div 
        className="absolute bottom-3 right-3 transition-opacity duration-300 pointer-events-none z-10"
        style={{ opacity: isDragging ? 1 : 0.6 }}
      >
        <svg width="50" height="25" viewBox="0 0 100 50">
          <path d="M 10 50 A 40 40 0 0 1 90 50" stroke="#fff" strokeWidth="8" fill="none" opacity="0.4" strokeLinecap="round" />
          <line x1="50" y1="50" x2="50" y2="10" stroke="#ff4500" strokeWidth="8" strokeLinecap="round" style={{ transform: `rotate(${needleAngle}deg)`, transformOrigin: '50px 50px', transition: !isDragging ? 'transform 0.4s ease-out' : 'none' }} />
        </svg>
      </div>
    </div>
  );
}