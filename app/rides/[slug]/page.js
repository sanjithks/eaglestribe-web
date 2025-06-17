import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
// ✅ FIX 1: Corrected relative path to a root-level 'lib' folder
import { getRide } from '@/lib/data';

// This function generates dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const ride = await getRide(params.slug);
  // ✅ FIX 2: Access properties directly from the 'ride' object
  return {
    title: `${ride?.title || "Ride Details"} | Eagles Tribe MC`,
    description: ride?.short_description || "A ride from Eagles Tribe MC.",
  };
}

// This is the main page component
export default async function RideDetailPage({ params }) {
  const ride = await getRide(params.slug);

  if (!ride) {
    notFound();
  }

  // ✅ FIX 3: Destructure all fields directly from the 'ride' object
  const { 
    title, 
    ride_date, 
    author, 
    rich_text_markdown, 
    slug_cover 
  } = ride;

  // ✅ FIX 4: NEW GALLERY LOGIC
  // Create an array of gallery images by checking for each possible field
  const galleryImages = [];
  for (let i = 1; i <= 11; i++) {
    // Access property dynamically, e.g., ride['gallery_1']
    if (ride[`gallery_${i}`]) {
      galleryImages.push(ride[`gallery_${i}`]);
    }
  }

  // Helper variables for the main cover image
  const bannerUrl = slug_cover?.url || null;
  const bannerAlt = slug_cover?.alternativeText || title;

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md shadow-sm border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/rides" className="flex items-center gap-2 text-primary hover:underline transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Back to Rides
          </Link>
          <div className="text-right">
            <h1 className="text-xl md:text-2xl font-semibold text-secondary">{title}</h1>
            <p className="text-xs md:text-sm text-foreground/70">
              {new Date(ride_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              {/* ✅ NEW: Display the author if it exists */}
              {author && <span className="italic"> by {author}</span>}
            </p>
          </div>
        </div>
      </div>

      {bannerUrl && (
        <div className="relative my-6 max-w-5xl mx-auto px-4 aspect-[16/9]">
          <Image
            src={bannerUrl}
            alt={bannerAlt}
            fill
            className="rounded-lg object-cover w-full"
            priority
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <article className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{rich_text_markdown}</ReactMarkdown>
        </article>

        {/* ✅ FIX 5: NEW GALLERY LAYOUT */}
        {galleryImages.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6 text-secondary border-b border-primary/20 pb-2">Ride Gallery</h2>
            {/* This grid layout creates a more dynamic feel.
              On medium screens and up, the first image is larger.
            */}
            <div className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-3 gap-4">
              {galleryImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className={`
                    relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg group
                    ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
                  `}
                >
                  <Image
                    src={image.url}
                    alt={image.alternativeText || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}