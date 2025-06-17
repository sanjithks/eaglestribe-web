import Link from 'next/link';
import { getRides } from '@/lib/data';
import RideTile from '@/components/RideTile';

export const metadata = {
  title: 'Latest Rides | Eagles Tribe MC',
  description: 'Check out the latest rides and adventures from Eagles Tribe MC.',
};

export default async function RidesPage() {
  const rides = await getRides();
  
  // ✅ FIX: Filter and sort directly on the ride object.
  const validRides = rides.filter(ride => ride && ride.ride_date);
  const sortedRides = validRides.sort(
    (a, b) => new Date(b.ride_date) - new Date(a.ride_date)
  );
  
  const topThreeRides = sortedRides.slice(0, 3);

  return (
    <section className="bg-background text-foreground px-6 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-primary text-center mb-16">Latest Rides</h1>
        
        {topThreeRides.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {topThreeRides.map((ride) => (
              <RideTile key={ride.id} ride={ride} />
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