// @/app/gallery/[slug]/page.js
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRide } from '@/lib/data';
import InteractiveGallery from '@/components/InteractiveGallery'; // ✅ Use the new all-in-one component

export async function generateMetadata({ params }) {
  const ride = await getRide(params.slug);
  if (!ride) return { title: "Gallery Not Found" };
  return {
    title: `Gallery: ${ride.title} | Eagles Tribe MC`,
    description: `Photo gallery for the ride: ${ride.title}`,
  };
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
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md shadow-sm border-b border-white/10">
        <div className="max-w-7xl w-full mx-auto px-4 py-3 flex justify-between items-center">
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

      <div className="max-w-7xl w-full mx-auto">
        {galleryImages.length > 0 ? (
          <InteractiveGallery images={galleryImages} />
        ) : (
          <div className="w-full h-full flex items-center justify-center py-20">
            <p className="text-center text-lg text-foreground/70">This ride does not have a photo gallery.</p>
          </div>
        )}
      </div>
    </main>
  );
}