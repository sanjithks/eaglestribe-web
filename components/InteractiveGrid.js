'use client';

import { useState, useRef, useEffect } from 'react';
import InteractiveImage from './InteractiveImage'; // We will import the dumb image component

export default function InteractiveGrid({ images }) {
  const [isDragging, setIsDragging] = useState(false);
  const [reveal, setReveal] = useState(0); // The SHARED reveal state for all images
  const startXRef = useRef(0);
  const audioRef = useRef(null);

  // Initialize the single audio object for the whole grid
  useEffect(() => {
    audioRef.current = new Audio('/sounds/engine-rev.mp3');
    audioRef.current.loop = true;
  }, []);

  // --- Event Handlers for the ENTIRE grid area ---
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

  // Add global listeners when dragging starts
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
            {/* Pass the shared state down to each image */}
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