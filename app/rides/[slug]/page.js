import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import { getRide } from '@/lib/data'; // Assuming this function can be used on the server

// generateMetadata now works because this is a Server Component.
export async function generateMetadata({ params }) {
  const ride = await getRide(params.slug);
  if (!ride) {
    return { title: "Ride Not Found" };
  }
  return {
    title: `${ride.title} | Eagles Tribe MC`,
    description: ride.short_description || "A ride from Eagles Tribe MC.",
  };
}

// The page is now an async Server Component.
// It receives `searchParams` to determine the back link reliably.
export default async function RideDetailPage({ params, searchParams }) {
  // 1. Fetch data ONCE on the server.
  const ride = await getRide(params.slug);

  // 2. Use notFound() correctly on the server.
  if (!ride) {
    notFound();
  }

  // 3. Determine the back link reliably without client-side JS.
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

  // The entire page is rendered on the server, so there's no loading state.
  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md shadow-sm border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href={backHref} className="flex items-center gap-2 text-primary hover:underline transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Back to Rides
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

      {bannerUrl && (
        <div className="relative my-6 max-w-5xl mx-auto px-4 aspect-[16/9]">
          <Image src={bannerUrl} alt={bannerAlt} fill className="rounded-lg object-cover w-full" priority />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <article className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{rich_text_markdown}</ReactMarkdown>
        </article>

        {galleryImages.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6 text-secondary border-b border-primary/20 pb-2">Ride Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-3 gap-4">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id || index}
                  className={`relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg group ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                >
                  <Image src={image.url} alt={image.alternativeText || `Gallery image ${index + 1}`} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}