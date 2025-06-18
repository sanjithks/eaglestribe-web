// app/rides/[slug]/page.js
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getRide } from '@/lib/data';
// We no longer need the standard Image component here
// import Image from "next/image";
import ProtectedCanvasImage from '@/components/ProtectedCanvasImage'; // ✅ Import the protected component

export async function generateMetadata({ params }) {
  const ride = await getRide(params.slug);
  return {
    title: `${ride?.title || "Ride Details"} | Eagles Tribe MC`,
    description: ride?.short_description || "A ride from Eagles Tribe MC.",
  };
}

export default async function RideDetailPage({ params, searchParams }) {
  const ride = await getRide(params.slug);

  if (!ride) {
    notFound();
  }
  
  const fromArchives = searchParams.from === 'archives';
  const backHref = fromArchives ? '/rides/archives' : '/rides';

  const { title, ride_date, author, rich_text_markdown, slug_cover } = ride;

  const galleryImages = [];
  for (let i = 1; i <= 11; i++) {
    if (ride[`gallery_${i}`]) {
      galleryImages.push(ride[`gallery_${i}`]);
    }
  }

  const bannerUrl = slug_cover?.url || null;
  const bannerAlt = slug_cover?.alternativeText || title;

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* ... (Sticky header with back button is unchanged) ... */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md shadow-sm border-b border-white/10">
         {/* ... (content of header) ... */}
      </div>

      {bannerUrl && (
        <div className="relative my-6 max-w-5xl mx-auto px-4 aspect-[16/9] bg-foreground/10 rounded-lg flex items-center justify-center">
          {/* ✅ Use ProtectedCanvasImage for the main banner image */}
          <ProtectedCanvasImage
            src={bannerUrl}
            alt={bannerAlt}
            className="w-full h-full object-cover rounded-lg"
            priority // You can still pass props like priority
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <article className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{rich_text_markdown}</ReactMarkdown>
        </article>

        {galleryImages.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6 text-secondary border-b border-primary/20 pb-2">Ride Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <div 
                  key={image.id || index}
                  className="relative w-full h-full aspect-[4/3] rounded-lg shadow-lg bg-foreground/10 flex items-center justify-center"
                >
                  {/* ✅ Use ProtectedCanvasImage for the gallery images here too */}
                  <ProtectedCanvasImage
                    src={image.url}
                    alt={image.alternativeText || `Gallery image ${index + 1}`}
                    className="w-full h-full object-cover"
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