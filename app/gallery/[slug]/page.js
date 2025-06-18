// app/gallery/[slug]/page.js

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRide } from '@/lib/data';
// We will use the InteractiveGrid component here, which you can place in its own file
// For simplicity, I'm including it in this response, but you should have it in `/components/InteractiveGrid.js`
import InteractiveGrid from '@/components/InteractiveGrid'; 

export async function generateMetadata({ params }) {
    // ... metadata logic is unchanged
}

export default async function GalleryDetailPage({ params }) {
  const ride = await getRide(params.slug);
  if (!ride) notFound();

  const galleryImages = [];
  for (let i = 1; i <= 11; i++) {
    if (ride[`gallery_${i}`]) {
      galleryImages.push(ride[`gallery_${i}`]);
    }
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* ... Header is unchanged ... */}
      <div className="sticky top-0 z-40 ..."></div>

      <div className="max-w-7xl w-full mx-auto">
        {galleryImages.length > 0 ? (
          // Use the "smart" grid component here for the full experience
          <InteractiveGrid images={galleryImages} />
        ) : (
          <div className="w-full h-full flex items-center justify-center py-20">
            <p className="text-center text-lg text-foreground/70">This ride does not have a photo gallery.</p>
          </div>
        )}
      </div>
    </main>
  );
}