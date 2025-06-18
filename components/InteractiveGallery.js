'use client';

import { useState, useRef, useEffect } from 'react';

// A self-contained "Slide" component that handles all interactions for a single image.
function InteractiveSlide({ image }) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const audioRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [reveal, setReveal] = useState(0); // 0-100 reveal percentage
  const startXRef = useRef(0);

  const MAX_BLUR = 16; // px

  // --- Initialize Image & Audio ---
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
      // Initially draw the image blurred
      context.filter = `blur(${MAX_BLUR}px)`;
      context.drawImage(img, 0, 0);
    };
    img.src = image.url;
  }, [image.url]);

  // ✅ FIX #3: This new effect redraws the image whenever the `reveal` state changes.
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const context = canvas.getContext('2d');
    const blurAmount = MAX_BLUR * (1 - reveal / 100);
    
    // Set the blur filter based on the current reveal state
    context.filter = `blur(${blurAmount}px)`;
    // Redraw the image with the new filter applied
    context.drawImage(img, 0, 0);
  }, [reveal]); // This effect runs every time `reveal` is updated.

  // --- Event Handlers for Drag & Sound ---
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
  
  // Add global listeners while dragging for a smooth experience
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

  // --- Right-Click Protection ---
  const handleContextMenu = (e) => {
    e.preventDefault(); // Also prevent the menu from appearing
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    context.filter = 'none'; // Ensure the blank canvas isn't blurry
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const needleAngle = -90 + (reveal / 100) * 180;

  return (
    // ✅ FIX #4: This container is now `relative` to correctly position the rev meter.
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
export default function InteractiveGallery({ images }) {
  return (
    // ✅ FIX #1 & #2: This container creates the working horizontal carousel.
    // It fills the available height and allows horizontal scrolling.
    <div className="w-full h-full flex items-center overflow-x-auto snap-x snap-mandatory no-scrollbar py-4">
      {/* Padding at the start for better snapping of the first image */}
      <div className="flex-shrink-0 w-[5vw] md:w-[10vw] h-full snap-center"></div>
      
      {images.map((image, index) => (
        // Each slide is a flex item that does not shrink and takes up most of the viewport width
        <div 
          key={image.id || index} 
          className="flex-shrink-0 w-[90vw] md:w-[80vw] h-full flex items-center justify-center snap-center p-2"
        >
          <InteractiveSlide image={image} />
        </div>
      ))}

      {/* Padding at the end for better snapping of the last image */}
      <div className="flex-shrink-0 w-[5vw] md:w-[10vw] h-full snap-center"></div>
    </div>
  );
}