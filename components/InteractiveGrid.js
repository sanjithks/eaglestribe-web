'use client';

import { useState, useRef, useEffect } from 'react';
// This component should now import the base InteractiveImage to display
import InteractiveImage from './InteractiveImage'; 

export default function InteractiveGrid({ images }) {
  const [isDragging, setIsDragging] = useState(false);
  const [reveal, setReveal] = useState(0); 
  const startXRef = useRef(0);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/sounds/engine-rev.mp3');
    // ✅ FIX: `loop` is removed, so sound plays only once.
  }, []);

  const handlePressStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.clientX || e.touches[0].clientX;
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset before playing
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

  return (
    <div
      className="w-full h-full cursor-grab unselectable"
      onMouseDown={handlePressStart}
      onTouchStart={handlePressStart}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 p-4 md:p-6">
        {images.map((image) => (
          <div
            key={image.id || image.url}
            className="w-full aspect-video rounded-lg shadow-lg overflow-hidden bg-black/10"
          >
            <InteractiveImage 
              image={image} 
              reveal={reveal} 
              isRevealing={isDragging || reveal > 0} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}