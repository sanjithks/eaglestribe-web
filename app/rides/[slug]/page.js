// app/rides/[slug]/page.js

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getRide(slug) {
  // --- THE ONLY CHANGE IS HERE ---
  // Using a simpler, comma-separated populate query. This is more reliable.
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides?filters[documentId][$eq]=${slug}&populate=featured_image,ride_gallery,author`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    // This will help us debug if the API itself is failing
    console.error('Failed to fetch ride data. Status:', res.status);
    return null;
  }
  
  const textResponse = await res.text();
  try {
    const data = JSON.parse(textResponse);
    return data?.data?.[0] || null;
  } catch (e) {
      console.error("Failed to parse JSON response:", e);
      console.error("Response text was:", textResponse);
      return null;
  }
}

export async function generateMetadata({ params }) {
  const ride = await getRide(params.slug);
  // We need to access attributes here if getRide returns the full object
  const attrs = ride?.attributes || ride;
  return {
    title: attrs?.title || "Ride Details",
    description: attrs?.short_description || "A ride from Eagles Tribe MC.",
  };
}

export default async function RideDetailPage({ params }) {
  const rideData = await getRide(params.slug);

  if (!rideData) {
    notFound();
  }

  // IMPORTANT: Strapi v4/v5 with deep populate often returns the .attributes wrapper.
  // We will safely handle both cases: with or without .attributes.
  const ride = rideData.attributes || rideData;

  const { title, ride_date, detailed_write_up, featured_image, ride_gallery, author } = ride;

  // This logic now checks for the nested 'data' key which is common for populated fields.
  const bannerImage = featured_image?.data?.attributes;
  const galleryImages = ride_gallery?.data || [];
  const authorName = author?.data?.attributes?.name || "Eagles Tribe";
  
  // Use the image URL directly from Cloudinary
  const bannerUrl = bannerImage?.url || null;

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
                <p className="text-xs md:text-sm text-foreground/70">by {authorName} on {new Date(ride_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
        </div>
      </div>

      {bannerUrl && (
        <div className="relative my-6 max-w-5xl mx-auto">
          <Image
            src={bannerUrl}
            alt={bannerImage.alternativeText || title}
            width={bannerImage.width || 1200}
            height={bannerImage.height || 675}
            className="rounded-md object-cover w-full"
            priority
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 pb-16">
          <article className="prose dark:prose-invert max-w-none">
             <div dangerouslySetInnerHTML={{ __html: detailed_write_up.replace(/\n/g, '<br />') }} />
          </article>

          {galleryImages.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-secondary">Ride Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((image) => {
                  const imageUrl = image?.attributes?.url || null;

                  return imageUrl ? (
                    <div key={image.id} className="relative aspect-square overflow-hidden rounded-lg shadow-lg group">
                      <Image
                        src={imageUrl}
                        alt={image.attributes.alternativeText || 'Ride gallery image'}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
      </div>
    </main>
  );
}