// @/app/gallery/page.js
import Link from 'next/link';
import RideTile from '@/components/RideTile';
// ✅ Import the functions from your central data library
import { getRecentRides, getArchivedRides } from '@/lib/data';

export const metadata = {
  title: 'Ride Galleries | Eagles Tribe MC',
  description: 'A visual archive of our past rides and adventures.',
};

export default async function GalleryPage() {
  // ✅ Fetch all rides by combining the recent and archived lists
  const recentRides = await getRecentRides();
  const archivedRides = await getArchivedRides();
  const allRides = [...recentRides, ...archivedRides];

  // The rides are already sorted by date from the source functions
  
  return (
    <section className="bg-background text-foreground px-6 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-primary">Ride Galleries</h1>
          <p className="mt-4 text-lg text-foreground/80">A visual look back at our journeys.</p>
        </div>
        
        {allRides.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {allRides.map((ride) => (
              // Use the smart RideTile component
              <RideTile
                key={ride.id}
                ride={ride}
                // Tell it to link to the gallery detail page
                href={`/gallery/${ride.documentId}`}
                // Tell it to use the compact version (no description)
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