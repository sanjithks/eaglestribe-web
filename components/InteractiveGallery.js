'use client';

import { useState, useRef, useEffect } from 'react';

function InteractiveSlide({ image }) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [reveal, setReveal] = useState(0);
  const startXRef = useRef(0);
  const MAX_BLUR = 16;

  useEffect(() => {
    audioRef.current = new Audio('/sounds/engine-rev.mp3');
    audioRef.current.loop = true;
    const canvas = canvasRef.current;
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

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;
    const context = canvas.getContext('2d');
    const blurAmount = MAX_BLUR * (1 - reveal / 100);
    context.filter = `blur(${blurAmount}px)`;
    context.drawImage(img, 0, 0);
  }, [reveal]);

  const handlePressStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.clientX || e.touches[0].clientX;
    if (audioRef.current) audioRef.current.play();
  };

  const handlePressEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setReveal(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches[0].clientX;
    const deltaX = currentX - startXRef.current;
    const percentage = Math.min(100, Math.max(0, (deltaX / 150) * 100));
    setReveal(percentage);
    if (audioRef.current) {
      audioRef.current.volume = 0.2 + (percentage / 100) * 0.6;
      audioRef.current.playbackRate = 0.8 + (percentage / 100) * 1.7;
    }
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
    // ✅ FIX #4: This is the container for a SINGLE slide.
    // It's `relative` so the rev meter is positioned inside it.
    <div
      className="w-full h-full flex items-center justify-center cursor-grab relative unselectable"
      onMouseDown={handlePressStart}
      onTouchStart={handlePressStart}
      onContextMenu={handleContextMenu}
    >
      <canvas
        ref={canvasRef}
        className="max-w-full max-h-full object-contain"
      />
      <div 
        className="absolute bottom-4 right-4 transition-opacity duration-300 pointer-events-none z-10"
        style={{ opacity: isDragging || reveal > 0 ? 1 : 0.6 }}
      >
        <svg width="60" height="30" viewBox="0 0 100 50">
          <path d="M 10 50 A 40 40 0 0 1 90 50" stroke="#fff" strokeWidth="6" fill="none" opacity="0.4" strokeLinecap="round" />
          <line x1="50" y1="50" x2="50" y2="10" stroke="#ff4500" strokeWidth="6" strokeLinecap="round" style={{ transform: `rotate(${needleAngle}deg)`, transformOrigin: '50px 50px', transition: isDragging ? 'none' : 'transform 0.4s ease-out' }} />
        </svg>
      </div>
    </div>
  );
}


// --- Main Carousel Component ---
export default function InteractiveGallery({ images, className }) {
  return (
    // ✅ FIX #1 & #2: This container creates the working horizontal carousel.
    // It takes the full height and allows horizontal scrolling.
    <div className={`w-full h-full flex items-center overflow-x-auto snap-x snap-mandatory no-scrollbar ${className}`}>
      <div className="flex-shrink-0 w-[5vw] md:w-[10vw] h-full snap-center"></div>
      {images.map((image, index) => (
        <div 
          key={image.id || index} 
          className="flex-shrink-0 w-[90vw] md:w-[80vw] h-full flex items-center justify-center snap-center p-4"
        >
          <InteractiveSlide image={image} />
        </div>
      ))}
      <div className="flex-shrink-0 w-[5vw] md:w-[10vw] h-full snap-center"></div>
    </div>
  );
}