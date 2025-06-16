import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Function to fetch a single ride by its slug
async function getRide(slug) {
  try {
    // We filter by 'documentId' and populate the necessary image fields
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides?filters[documentId][$eq]=${slug}&populate=featured_image,ride_gallery`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch ride');

    const ridesData = await res.json();

    // The filter returns an array, so we take the first result
    if (ridesData.data && ridesData.data.length > 0) {
      return ridesData.data[0];
    }

    return null; // Return null if no ride is found

  } catch (error) {
    console.error('Error fetching ride:', error);
    return null;
  }
}

// The main page component
export default async function RidePage({ params }) {
  const ride = await getRide(params.slug);

  // If no ride is found, show the 404 page
  if (!ride) {
    notFound();
  }

  // Safely access properties from the ride object
  const { title, author, ride_date, detailed_write_up, featured_image, ride_gallery } = ride;

  const bannerUrl = featured_image?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${featured_image.url}`
    : null;
    
  // The ride_gallery is an array of image objects under a 'data' key
  const galleryImages = ride_gallery?.data || [];

  return (
    <main className="bg-background text-foreground min-h-screen">
      
      {/* --- Banner Image --- */}
      {bannerUrl && (
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={bannerUrl}
            alt={`${title} banner`}
            fill
            className="object-cover"
            priority // Load the main banner image first
          />
          {/* Optional: Add a dark overlay for better text contrast if needed */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* --- Sticky Header --- */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Back to Rides Link */}
          <Link href="/rides" className="flex items-center gap-2 text-primary hover:underline transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Back to Rides
          </Link>

          {/* Ride Details */}
          <div className="text-right">
            <h1 className="text-xl md:text-2xl font-bold text-secondary">{title}</h1>
            <p className="text-xs md:text-sm text-foreground/70">
              by {author} on {new Date(ride_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* --- Scrollable Content --- */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        
        {/* Detailed Write-up */}
        {/* For production, use a library like 'react-markdown' to safely render this content */}
        <article className="prose prose-invert prose-lg max-w-none prose-p:text-foreground/80 prose-headings:text-secondary">
           <div dangerouslySetInnerHTML={{ __html: detailed_write_up.replace(/\n/g, '<br />') }} />
        </article>

        {/* Ride Gallery */}
        {galleryImages.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-secondary">Moments From The Ride</h2>
              {/* Here's an alternative line you could use: */}
              {/* <p className="text-foreground/60 mt-2">A glimpse into our journey.</p> */}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map(image => {
                const imageUrl = image?.url ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}` : null;
                if (!imageUrl) return null;

                return (
                  <div key={image.id} className="relative aspect-square overflow-hidden rounded-lg shadow-lg group">
                    <Image
                      src={imageUrl}
                      alt={image.alternativeText || 'Ride gallery image'}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}