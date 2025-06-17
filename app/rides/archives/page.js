import Link from 'next/link';
import { getRides } from '../../lib/data';
// ✅ Use the same, clean absolute path. Much easier!
import RideTile from '@/components/RideTile';

// ... rest of the file is the same
export const metadata = {
  title: 'Ride Archives | Eagles Tribe MC',
  description: 'Explore the archives of past rides and adventures from Eagles Tribe MC.',
};

export default async function ArchivesPage() {
  const rides = await getRides();
  const sortedRides = rides.sort(
    (a, b) => new Date(b.attributes.ride_date) - new Date(a.attributes.ride_date)
  );
  const archivedRides = sortedRides.slice(3);

  return (
    <section className="bg-background text-foreground px-6 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-primary">Ride Archives</h1>
          <p className="mt-4 text-lg text-foreground/80">A look back at our past journeys.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {archivedRides.map((ride) => (
            <RideTile key={ride.id} ride={ride} />
          ))}
        </div>
        <div className="mt-20 text-center">
          <Link href="/rides" className="text-secondary hover:underline text-xl">
            &larr; Back to Latest Rides
          </Link>
        </div>
      </div>
    </section>
  );
}