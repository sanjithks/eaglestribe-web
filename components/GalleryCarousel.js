'use client';

import ProtectedCanvasImage from '@/components/ProtectedCanvasImage';

export default function GalleryCarousel({ images }) {
  return (
    // This container enables horizontal scrolling with "snap" behavior
    <div className="w-full h-full flex items-center overflow-x-auto snap-x snap-mandatory no-scrollbar py-8">
      {/* Add padding at the start for better snapping */}
      <div className="flex-shrink-0 w-[5vw] md:w-[10vw] h-full snap-center"></div>

      {images.map((image, index) => (
        // Each image is a "slide" in the carousel
        <div 
          key={image.id || index} 
          className="flex-shrink-0 w-[90vw] md:w-[80vw] h-full flex items-center justify-center snap-center relative px-4"
        >
          <ProtectedCanvasImage
            src={image.url}
            alt={image.alternativeText || `Gallery image ${index + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg shadow-xl"
            priority={index < 2}
          />
        </div>
      ))}
      
      {/* Add padding at the end */}
      <div className="flex-shrink-0 w-[5vw] md:w-[10vw] h-full snap-center"></div>
    </div>
  );
}