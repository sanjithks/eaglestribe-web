// app/rides/[slug]/page.js
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getRide } from '@/lib/data';
// ✅ Use the new, simple ProtectedImage component
import ProtectedImage from '@/components/ProtectedImage';

export async function generateMetadata({ params }) {
  const ride = await getRide(params.slug);
  return {
    title: `${ride?.title || "Ride Details"} | Eagles Tribe MC`,
    description: ride?.short_description || "A ride from Eagles Tribe MC.",
  };
}

export default async function RideDetailPage({ params, searchParams }) {
  const ride = await getRide(params.slug);
  if (!ride) notFound();
  
  const fromArchives = searchParams.from === 'archives';
  const backHref = fromArchives ? '/rides/archives' : '/rides';
  const { title, ride_date, author, rich_text_markdown, slug_cover } = ride;

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

      {slug_cover && (
        <div className="relative my-6 max-w-5xl mx-auto px-4 aspect-video bg-foreground/10 rounded-lg flex items-center justify-center overflow-hidden">
          {/* ✅ Use simple protection for the banner */}
          <ProtectedImage
            src={slug_cover.url}
            alt={slug_cover.alternativeText || title}
            className="w-full h-full object-cover"
            priority
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
              {galleryImages.map((image) => (
                <div 
                  key={image.id || image.url}
                  className="w-full aspect-video rounded-lg shadow-lg overflow-hidden bg-black/10"
                >
                  {/* ✅ Use simple protection for the inline gallery */}
                  <ProtectedImage
                    image={image}
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