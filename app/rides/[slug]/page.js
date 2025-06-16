import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getRide(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides?filters[documentId][$eq]=${slug}&populate[featured_image]=*&populate[ride_gallery]=*&populate[author]=*`,
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

export default async function RidePage({ params }) {
  const ride = await getRide(params.slug);

  if (!ride) {
    notFound();
  }

  const { title, ride_date, detailed_write_up, featured_image, ride_gallery, author } = ride.attributes;

  const bannerUrl = featured_image?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${featured_image.data.attributes.url}`
    : null;

  const galleryImages = ride_gallery?.data || [];

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Banner */}
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
          <Link href="/rides" className="flex items-center gap-2 text-primary hover:underline transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to Rides
          </Link>
          <div className="text-right">
            <h1 className="text-xl md:text-2xl font-bold text-secondary">{title}</h1>
            <p className="text-xs md:text-sm text-foreground/70">
              {author?.data?.attributes?.name || 'Eagles Tribe'} on {new Date(ride_date).toLocaleDateString('en-US')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        {/* Write-up */}
        <article className="prose prose-invert prose-lg max-w-none prose-p:text-foreground/80 prose-headings:text-secondary">
          <div dangerouslySetInnerHTML={{ __html: detailed_write_up.replace(/\n/g, '<br />') }} />
        </article>

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-secondary text-center mb-8">Moments From The Ride</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image) => {
                const imageUrl = image?.attributes?.url
                  ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.attributes.url}`
                  : null;

                return imageUrl ? (
                  <div key={image.id} className="relative aspect-square overflow-hidden rounded-lg shadow-lg group">
                    <Image
                      src={imageUrl}
                      alt={image.attributes?.alternativeText || 'Ride gallery image'}
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