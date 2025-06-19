// @/components/ViewportSize.js
'use client';
import { useEffect, useState } from 'react';

export default function ViewportSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black text-white text-sm px-3 py-2 rounded shadow-lg opacity-80 font-mono">
      {size.width}px × {size.height}px
    </div>
  );
}