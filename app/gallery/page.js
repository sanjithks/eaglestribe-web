// app/gallery/page.js

import Link from 'next/link';
import Image from 'next/image';

// Data fetching logic is kept within this file to honor the request
// not to modify lib/data.js for this page's specific needs.
async function getAllRidesForGallery() {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides?populate=featured_image`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
        console.error("API fetch error for gallery page:", await res.text());
        return [];
    }
    const data = await res.json();
    // Assuming your working code expects a flat structure
    return data.data || [];
  } catch (error) {
    console.error("Error fetching rides for gallery:", error);
    return [];
  }
}

export const metadata = {
  title: 'Ride Galleries | Eagles Tribe MC',
  description: 'A visual archive of our past rides and adventures.',
};

export default async function GalleryPage() {
  const rides = await getAllRidesForGallery();

  // Sort the rides by date, newest first, directly in the page
  const sortedRides = rides.sort(
    (a, b) => new Date(b.ride_date) - new Date(a.ride_date)
  );

  return (
    <section className="bg-background text-foreground px-6 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-primary">Ride Galleries</h1>
          <p className="mt-4 text-lg text-foreground/80">A visual look back at our journeys.</p>
        </div>
        
        {sortedRides.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedRides.map((ride) => {
              const { title, documentId, featured_image } = ride;
              const imageUrl = featured_image?.url || null;

              return (
                // Each tile links to its dedicated gallery detail page
                <Link href={`/gallery/${documentId}`} key={ride.id} className="group block text-center">
                  <div className="relative aspect-[4/3] w-full bg-foreground/10 rounded-xl shadow-md overflow-hidden">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={`Featured image for ${title}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-foreground/50">No Image</p>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-secondary transition-colors group-hover:text-primary">
                    {title}
                  </h3>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-lg">No ride galleries available right now.</p>
        )}
      </div>
    </section>
  );
}