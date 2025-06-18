// app/gallery/page.js
import Link from 'next/link';
import RideTile from '@/components/RideTile';

// This data fetcher now MUST also flatten the data.
async function getAllRidesForGallery() {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides?populate=featured_image&fields=title,documentId,ride_date`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    const nestedRides = json.data || [];
    
    // ✅ FIX: Flatten the data here so it matches the rest of the site.
    return nestedRides.map(ride => ({ id: ride.id, ...ride.attributes }));

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

  // The sorting can now safely use the flat properties
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
            {sortedRides.map((ride) => (
              // This will now work correctly because the `ride` object is flat
              <RideTile
                key={ride.id}
                ride={ride}
                href={`/gallery/${ride.documentId}`}
                displayMode="compact"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">No ride galleries available right now.</p>
        )}
      </div>
    </section>
  );
}