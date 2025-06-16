// app/galleries/page.js

import Link from 'next/link';
import Image from 'next/image';

// This function now fetches all rides and their featured images.
async function getAllRides() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides?populate=featured_image`,
      { cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching rides:", error);
    return [];
  }
}

// The page is now a visual archive of all rides.
export default async function RideArchivePage() {
  const rides = await getAllRides();

  // Sort the rides by date in descending order (newest first).
  const sortedRides = rides.sort(
    (a, b) => new Date(b.ride_date) - new Date(a.ride_date)
  );

  return (
    <section className="bg-background text-foreground px-6 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-primary text-center mb-16">Ride Archives</h1>
        
        {sortedRides.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedRides.map((ride) => {
              // Destructure the data directly from the ride object.
              const { title, documentId, featured_image } = ride;
              // The full image URL from Cloudinary is used directly.
              const imageUrl = featured_image?.url || null;

              return (
                <Link href={`/rides/${documentId}`} key={ride.id} className="group block text-center">
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
                      // Placeholder for rides without a featured image
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
          <p className="text-center text-lg">No rides available right now.</p>
        )}
      </div>
    </section>
  );
}