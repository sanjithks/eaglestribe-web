// app/gallery/[slug]/page.js

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRide } from '@/lib/data';
import InteractiveImage from '@/components/InteractiveImage'; // ✅ Use the new unified component

export async function generateMetadata({ params }) {
    //... (this code is correct and unchanged)
}

export default async function GalleryDetailPage({ params }) {
  //... (this data fetching code is correct and unchanged)
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
      {/* ... (your sticky header is correct and unchanged) ... */}
      
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {galleryImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((image) => (
              <div
                key={image.id || image.url}
                className="w-full aspect-video rounded-lg shadow-lg overflow-hidden bg-black/10"
              >
                {/* ✅ Use the interactive image and explicitly ENABLE the sound */}
                <InteractiveImage image={image} enableSound={true} />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center py-20">
            <p className="text-center text-lg text-foreground/70">This ride does not have a photo gallery.</p>
          </div>
        )}
      </div>
    </main>
  );
}