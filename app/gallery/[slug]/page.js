// app/gallery/[slug]/page.js

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRide } from '@/lib/data'; // ✅ Using your existing function

// This function generates dynamic metadata for the gallery page
export async function generateMetadata({ params }) {
  const ride = await getRide(params.slug);
  if (!ride) return { title: "Gallery Not Found" };
  return {
    title: `Gallery: ${ride.title} | Eagles Tribe MC`,
    description: `Photo gallery for the ride: ${ride.title}`,
  };
}

export default async function GalleryDetailPage({ params }) {
  // Fetch all data for the ride, including gallery fields, using getRide
  const ride = await getRide(params.slug);

  if (!ride) {
    notFound();
  }

  // Create an array of gallery images from the ride data
  const galleryImages = [];
  for (let i = 1; i <= 11; i++) {
    if (ride[`gallery_${i}`]) {
      galleryImages.push(ride[`gallery_${i}`]);
    }
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* --- Sticky Header with Back Button --- */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md shadow-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* This link now correctly points back to the main gallery page */}
          <Link href="/gallery" className="flex items-center gap-2 text-primary hover:underline transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Back to All Galleries
          </Link>
          <div className="text-right">
            <h1 className="text-xl md:text-2xl font-semibold text-secondary">{ride.title}</h1>
            <p className="text-xs md:text-sm text-foreground/70">Photo Gallery</p>
          </div>
        </div>
      </div>

      {/* --- Gallery Grid --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {galleryImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={image.id || index}
                className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg group"
              >
                <Image
                  src={image.url}
                  alt={image.alternativeText || `Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-foreground/70">This ride does not have a photo gallery.</p>
        )}
      </div>
    </main>
  );
}