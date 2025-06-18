'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function ThrottleImage(props) {
  const [isDragging, setIsDragging] = useState(false);
  const [reveal, setReveal] = useState(0);
  const startXRef = useRef(0);
  const containerRef = useRef(null);

  // ✅ 1. Create a ref to hold the Audio object.
  const audioRef = useRef(null);

  const MAX_DRAG_DISTANCE = 150;
  const MAX_BLUR = 16;
  
  // ✅ 2. Initialize the Audio object once on the client-side.
  useEffect(() => {
    // This code only runs in the browser
    audioRef.current = new Audio('/sounds/engine-rev.mp3'); // Make sure this path is correct!
    audioRef.current.loop = true; // We want the sound to loop while dragging
  }, []);


  const handlePressStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const currentX = e.clientX || e.touches[0].clientX;
    startXRef.current = currentX;

    // ✅ 3. Start playing the audio on press start.
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handlePressEnd = () => {
    if (!isDragging) return; // Prevent this from firing unnecessarily
    setIsDragging(false);
    setReveal(0);

    // ✅ 4. Stop and reset the audio when the user lets go.
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Rewind for the next time
    }
  };

  const handleMove = (e) => {
    if (!isDragging) return;

    const currentX = e.clientX || e.touches[0].clientX;
    const deltaX = currentX - startXRef.current;
    const percentage = Math.min(100, Math.max(0, (deltaX / MAX_DRAG_DISTANCE) * 100));
    setReveal(percentage);
    
    // ✅ 5. Dynamically change volume and pitch based on drag distance.
    if (audioRef.current) {
      // Volume from 20% to 80%
      audioRef.current.volume = 0.2 + (percentage / 100) * 0.6;
      // Pitch (playback rate) from 0.8x (low rev) to 2.5x (high rev)
      audioRef.current.playbackRate = 0.8 + (percentage / 100) * 1.7;
    }
  };

  // We need global listeners to correctly handle the drag ending
  useEffect(() => {
    // We only need move listeners when dragging
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('touchmove', handleMove);
    }
    // The end listeners should always be there to catch the release
    window.addEventListener('mouseup', handlePressEnd);
    window.addEventListener('touchend', handlePressEnd);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handlePressEnd);
      window.removeEventListener('touchend', handlePressEnd);
    };
  }, [isDragging]);

  const blurAmount = MAX_BLUR * (1 - reveal / 100);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-grab select-none overflow-hidden"
      onMouseDown={handlePressStart}
      onTouchStart={handlePressStart}
    >
      <Image
        {...props}
        alt={props.alt || 'Drag to reveal image'}
        style={{
          filter: `blur(${blurAmount}px)`,
          transform: `scale(${1 + (blurAmount / MAX_BLUR) * 0.1})`,
          transition: isDragging ? 'none' : 'filter 0.4s ease-out, transform 0.4s ease-out',
        }}
        className="object-cover w-full h-full"
      />
      
      {/* --- UI Hint Overlay --- */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: reveal > 10 ? 0 : 1 }}
      >
        <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white/80 animate-pulse">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m0 13.5v2.25m0-13.5c-1.07-1.07-2.55-1.07-3.62 0-1.07 1.07-1.07 2.55 0 3.62s2.55 1.07 3.62 0c1.07-1.07 1.07-2.55 0-3.62zM3.96 7.86c-1.07 1.07-1.07 2.55 0 3.62s2.55 1.07 3.62 0c1.07-1.07 1.07-2.55 0-3.62-1.07-1.07-2.55-1.07-3.62 0zm14.16 0c-1.07 1.07-1.07 2.55 0 3.62s2.55 1.07 3.62 0c1.07-1.07 1.07-2.55 0-3.62-1.07-1.07-2.55-1.07-3.62 0z" />
            </svg>
            <p className="text-white/80 font-semibold text-lg">Click & Drag to Rev</p>
        </div>
      </div>
    </div>
  );
}