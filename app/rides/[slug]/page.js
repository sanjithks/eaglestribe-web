// app/rides/[slug]/page.js
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getRide } from '@/lib/data';
// ✅ FIX: Import the new, unified component instead of the old one.
import InteractiveImage from '@/components/InteractiveImage';

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
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md shadow-sm border-b border-white/10">
        <div className="max-w-7xl w-full mx-auto px-4 py-3 flex justify-between items-center">
            <Link href={backHref} className="flex items-center gap-2 text-primary hover:underline transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                Back
            </Link>
            <div className="text-right">
                <h1 className="text-xl md:text-2xl font-semibold text-secondary">{title}</h1>
                <p className="text-xs md:text-sm text-foreground/70">
                    {new Date(ride_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    {author && <span className="italic"> by {author}</span>}
                </p>
            </div>
        </div>
      </div>

      {slug_cover && (
        <div className="relative my-6 max-w-5xl mx-auto px-4 aspect-video bg-foreground/10 rounded-lg flex items-center justify-center overflow-hidden">
          {/* ✅ FIX: Use the new InteractiveImage component for the main banner image */}
          {/* We pass enableSound={true} to activate the effect on this detail page */}
          <InteractiveImage
            image={slug_cover}
            enableSound={true}
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
                  {/* ✅ FIX: Use the InteractiveImage component here too */}
                  <InteractiveImage
                    image={image}
                    enableSound={true}
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