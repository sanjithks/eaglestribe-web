// app/rides/page.js
import Link from 'next/link';
// ✅ FIX 1: Import the correct function, 'getRecentRides'.
import { getRecentRides } from '@/lib/data';
import RideTile from '@/components/RideTile';

export const metadata = {
  title: 'Latest Rides | Eagles Tribe MC',
  description: 'Check out the latest rides and adventures from Eagles Tribe MC.',
};

export default async function RidesPage() {
  // ✅ FIX 2: Call the correct function. All the sorting and filtering
  // is now handled inside getRecentRides(), so we can remove that logic from this page.
  const topThreeRides = await getRecentRides();

  return (
    <section className="bg-background text-foreground px-6 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-primary text-center mb-16">Latest Rides</h1>
        
        {topThreeRides.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {topThreeRides.map((ride) => (
              // Your RideTile component is already set up to work with this.
              // Make sure it uses the `href` prop.
              <RideTile 
                key={ride.id} 
                ride={ride} 
                href={`/rides/${ride.documentId}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-dark-charcoal">No rides available right now.</p>
        )}

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-secondary mb-4">Looking for more?</h2>
          <Link
            href="/rides/archives"
            className="inline-block bg-primary text-white py-4 px-10 rounded-lg shadow-md hover:bg-primary/90 transition duration-300 text-xl font-bold"
          >
            View Ride Archives
          </Link>
        </div>
      </div>
    </section>
  );
}