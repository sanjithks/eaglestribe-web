import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Function to fetch a single ride by its slug
async function getRide(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides?filters[documentId][$eq]=${slug}&populate[featured_image]=*&populate[ride_gallery]=*`,
      { cache: 'no-store' }
    );

    if (!res.ok) throw new Error('Failed to fetch ride');

    const ridesData = await res.json();
    return ridesData.data?.[0] || null;

  } catch (error) {
    console.error('Error fetching ride:', error);
    return null;
  }
}

// The main page component
export default async function RidePage({ params }) {
  const ride = await getRide(params.slug);

  if (!ride) notFound();

  const {
    title,
    author,
    ride_date,
    detailed_write_up,
    featured_image,
    ride_gallery,
  } = ride.attributes;

  const bannerUrl = featured_image?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${featured_image.data.attributes.url}`
    : null;

  const galleryImages = ride_gallery?.data || [];

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Banner Image */}
      {bannerUrl && (
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={bannerUrl}
            alt={`${title} banner`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/rides" className="flex items-center gap-2 text-primary hover:underline">
            ← Back to Rides
          </Link>
          <div className="text-right">
            <h1 className="text-xl md:text-2xl font-bold text-secondary">{title}</h1>
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <article className="prose prose-invert prose-lg max-w-none prose-p:text-foreground/80 prose-headings:text-secondary">
          <div dangerouslySetInnerHTML={{ __html: detailed_write_up?.replace(/\n/g, '<br />') }} />
        </article>

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-secondary mb-6 text-center">Ride Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((img) => {
                const imageUrl = img.attributes?.url
                  ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${img.attributes.url}`
                  : null;

                return imageUrl ? (
                  <div key={img.id} className="relative aspect-square overflow-hidden rounded-lg shadow-lg group">
                    <Image
                      src={imageUrl}
                      alt={img.attributes.alternativeText || 'Gallery Image'}
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