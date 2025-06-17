import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown'; // Import the markdown renderer

// This function fetches a single ride by its slug (documentId)
async function getRide(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides?filters[documentId][$eq]=${slug}&populate=*`,
    { cache: "no-store" } // Use cache: 'no-store' for development, consider revalidating in production
  );

  if (!res.ok) {
    // Log the error for debugging
    console.error("Failed to fetch ride:", await res.text());
    return null;
  }

  const data = await res.json();
  // Strapi v4 returns an array, we take the first item
  return data?.data?.[0] || null;
}

// This function generates dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const ride = await getRide(params.slug);
  // Access data via ride.attributes
  const rideAttributes = ride?.attributes || {};
  return {
    title: rideAttributes.title || "Ride Details",
    description: rideAttributes.short_description || "A ride from Eagles Tribe MC.",
  };
}

// This is the main page component
export default async function RideDetailPage({ params }) {
  const ride = await getRide(params.slug);

  // If no ride is found for the slug, show a 404 page
  if (!ride) {
    notFound();
  }

  // --- DATA DESTRUCTURING ---
  // All custom fields from Strapi are inside the 'attributes' object.
  const { title, ride_date, rich_text_markdown, slug_cover, ride_gallery } = ride.attributes;

  // Helper variables for cleaner access to nested media URLs
  const bannerUrl = slug_cover?.data?.attributes?.url || null;
  const bannerAlt = slug_cover?.data?.attributes?.alternativeText || title;
  const bannerWidth = slug_cover?.data?.attributes?.width || 1200;
  const bannerHeight = slug_cover?.data?.attributes?.height || 675;
  const galleryImages = ride_gallery?.data || [];

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* --- STICKY HEADER --- */}
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

      {/* --- BANNER IMAGE --- */}
      {bannerUrl && (
        <div className="relative my-6 max-w-5xl mx-auto px-4">
          <Image
            src={bannerUrl}
            alt={bannerAlt}
            width={bannerWidth}
            height={bannerHeight}
            className="rounded-lg object-cover w-full"
            priority
          />
        </div>
      )}

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* --- MARKDOWN RENDERER --- */}
        {/* This article tag uses the 'prose' classes from @tailwindcss/typography */}
        {/* to automatically style the HTML rendered from your markdown. */}
        <article className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{rich_text_markdown}</ReactMarkdown>
        </article>

        {/* --- IMAGE GALLERY --- */}
        {galleryImages.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-secondary">Ride Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image) => {
                const imageUrl = image?.attributes?.url;
                const altText = image?.attributes?.alternativeText || 'Ride gallery image';

                return imageUrl ? (
                  <div key={image.id} className="relative aspect-square overflow-hidden rounded-lg shadow-lg group">
                    <Image
                      src={imageUrl}
                      alt={altText}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* --- LINK TO ARCHIVES --- */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
            <h3 className="text-xl font-semibold text-secondary mb-4">
                Finished this story?
            </h3>
            <Link
                href="/rides/archives"
                className="inline-block text-primary hover:underline transition-colors"
            >
                Explore the Archives of Past Rides &rarr;
            </Link>
        </div>
      </div>
    </main>
  );
}