'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function ThrottleImage(props) {
  const [isDragging, setIsDragging] = useState(false);
  const [reveal, setReveal] = useState(0); // Reveal percentage (0 to 100)
  const startXRef = useRef(0);

  const MAX_DRAG_DISTANCE = 150; // How far to drag for full reveal
  const MAX_BLUR = 16; // The blur amount in pixels

  const handlePressStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const currentX = e.clientX || e.touches[0].clientX;
    startXRef.current = currentX;
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
    const percentage = Math.min(100, Math.max(0, (deltaX / MAX_DRAG_DISTANCE) * 100));
    setReveal(percentage);
  };
  
  // We need global listeners to handle releasing the mouse outside the image
  useEffect(() => {
    const moveHandler = (e) => handleMove(e);
    const endHandler = () => handlePressEnd();

    if (isDragging) {
      window.addEventListener('mousemove', moveHandler);
      window.addEventListener('touchmove', moveHandler);
      window.addEventListener('mouseup', endHandler);
      window.addEventListener('touchend', endHandler);
    }

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('touchmove', moveHandler);
      window.removeEventListener('mouseup', endHandler);
      window.removeEventListener('touchend', endHandler);
    };
  }, [isDragging]);

  // Calculate visual properties based on the reveal state
  const blurAmount = MAX_BLUR * (1 - reveal / 100);
  // Map the 0-100 reveal percentage to a -90 to +90 degree angle for the needle
  const needleAngle = -90 + (reveal / 100) * 180;

  return (
    <div
      className="relative w-full h-full cursor-grab select-none overflow-hidden"
      onMouseDown={handlePressStart}
      onTouchStart={handlePressStart}
    >
      <Image
        {...props}
        alt={props.alt || 'Drag to reveal image'}
        style={{
          filter: `blur(${blurAmount}px)`,
          transform: `scale(${1 + (blurAmount / MAX_BLUR) * 0.05})`, // More subtle zoom
          transition: isDragging ? 'none' : 'filter 0.4s ease-out, transform 0.4s ease-out',
        }}
        className="object-cover w-full h-full"
      />
      
      {/* ✅ NEW: The minimalist Rev Meter in the bottom right corner */}
      <div 
        className="absolute bottom-3 right-3 transition-opacity duration-300 pointer-events-none"
        // The meter is subtle by default and becomes fully visible during drag
        style={{ opacity: isDragging || reveal > 0 ? 1 : 0.6 }}
      >
        <svg width="60" height="30" viewBox="0 0 100 50">
          {/* Background track of the meter */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50" /* This path creates a semi-circle */
            stroke="#ffffff"
            strokeWidth="6"
            fill="none"
            opacity="0.4"
            strokeLinecap="round"
          />
          {/* The Needle that rotates */}
          <line
            x1="50" y1="50" x2="50" y2="10" /* A vertical line */
            stroke="#ff4500" /* A nice orange-red color */
            strokeWidth="6"
            strokeLinecap="round"
            style={{
              // Rotate the needle around its base point (50, 50)
              transform: `rotate(${needleAngle}deg)`,
              transformOrigin: '50px 50px',
              // Add a smooth transition for when the user releases the drag
              transition: isDragging ? 'none' : 'transform 0.4s ease-out',
            }}
          />
        </svg>
      </div>
    </div>
  );
}