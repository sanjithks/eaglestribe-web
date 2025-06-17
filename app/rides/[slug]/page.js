import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import { getRide } from '../../lib/data';

// This function generates dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const ride = await getRide(params.slug);
  const rideAttributes = ride?.attributes || {};
  return {
    title: `${rideAttributes.title || "Ride Details"} | Eagles Tribe MC`,
    description: rideAttributes.short_description || "A ride from Eagles Tribe MC.",
  };
}

// This is the main page component
export default async function RideDetailPage({ params }) {
  const ride = await getRide(params.slug);

  if (!ride) {
    notFound();
  }

  const { title, ride_date, rich_text_markdown, slug_cover, ride_gallery } = ride.attributes;

  const bannerUrl = slug_cover?.data?.attributes?.url || null;
  const bannerAlt = slug_cover?.data?.attributes?.alternativeText || title;
  const galleryImages = ride_gallery?.data || [];

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

        {galleryImages.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-secondary">Ride Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image) => (
                <div key={image.id} className="relative aspect-square overflow-hidden rounded-lg shadow-lg group">
                  <Image
                    src={image.attributes.url}
                    alt={image.attributes.alternativeText || 'Ride gallery image'}
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