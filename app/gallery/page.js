// app/gallery/page.js

// ✅ We now import RideTile instead of ProtectedCanvasImage
import Link from 'next/link'; // Still needed for the main link at the bottom
import RideTile from '@/components/RideTile';

// Data fetching logic is kept within this file as requested
async function getAllRidesForGallery() {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides?populate=featured_image`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
        console.error("API fetch error for gallery page:", await res.text());
        return [];
    }
    const data = await res.json();
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
              // ✅ This is the change. We now use the smart RideTile component.
              <RideTile
                key={ride.id}
                ride={ride}
                // We tell it where to link to
                href={`/gallery/${ride.documentId}`}
                // We tell it to use the compact version (no description/read more)
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