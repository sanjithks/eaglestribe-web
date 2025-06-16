// app/rides/[slug]/page.js

import Image from "next/image";
import Link from "next/link"; // Added for the back button
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery"; // Assuming you have this component

// --- FIX #1: Correct data fetching in BOTH functions ---

async function getRide(slug) {
  // Use the environment variable for flexibility. Populate all fields.
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides?filters[documentId][$eq]=${slug}&populate=*`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data = await res.json();
  // DO NOT use .attributes. Return the whole object from the data array.
  return data?.data?.[0] || null;
}

export async function generateMetadata({ params }) {
  const ride = await getRide(params.slug);
  // Now we access properties directly from the 'ride' object
  return {
    title: ride?.title || "Ride Details",
    description: ride?.short_description || "A ride from Eagles Tribe MC.",
  };
}

export default async function RideDetailPage({ params }) {
  const ride = await getRide(params.slug);

  if (!ride) {
    notFound();
  }

  // Destructure directly from the 'ride' object because we removed .attributes in getRide
  const { title, ride_date, detailed_write_up, featured_image, ride_gallery } = ride;

  // --- FIX #2: Re-add the base URL to create full image paths ---

  const bannerUrl = featured_image?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${featured_image.url}`
    : null;

  // Create full URLs for the gallery images before passing them to the component
  const galleryImagesWithFullUrls = ride_gallery?.data?.map(img => ({
    ...img, // Copy all original image data (id, etc.)
    // Create the full URL for use in the gallery component
    url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${img.url}`,
    width: img.width,
    height: img.height,
    name: img.name
  })) || [];

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
                <p className="text-xs md:text-sm text-foreground/70">{new Date(ride_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
        </div>
      </div>

      {bannerUrl && (
        <div className="relative my-6 max-w-5xl mx-auto">
          <Image
            src={bannerUrl}
            alt={featured_image.name || title}
            width={featured_image.width || 1200}
            height={featured_image.height || 675}
            className="rounded-md object-cover w-full"
            priority
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 pb-16">
          {/* --- FIX #3: Use dangerouslySetInnerHTML to render formatted text --- */}
          <article className="prose dark:prose-invert max-w-none">
             <div dangerouslySetInnerHTML={{ __html: detailed_write_up.replace(/\n/g, '<br />') }} />
          </article>

          {galleryImagesWithFullUrls.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-secondary">Ride Gallery</h2>
              {/* This component now receives images with full, working URLs */}
              <Gallery images={galleryImagesWithFullUrls} />
            </div>
          )}
      </div>
    </main>
  );
}