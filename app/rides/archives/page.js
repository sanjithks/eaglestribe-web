import Link from 'next/link';

// Fetch all rides from Strapi
async function getRides() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch rides');

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error loading archive rides:', error);
    return [];
  }
}

// Ride tile component
function RideTile({ ride }) {
  const { title, short_description, documentId } = ride;

  return (
    <Link href={`/rides/${documentId}`} className="block bg-foreground rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-secondary-brown mb-2">{title}</h3>
        <p className="text-dark-charcoal">{short_description}</p>
        <p className="mt-4 text-primary-red font-semibold hover:underline">Read More...</p>
      </div>
    </Link>
  );
}

// Archive page
export default async function ArchivesPage() {
  let rides = await getRides();

  // Sort by date descending
  rides = rides.sort((a, b) => new Date(b.ride_date) - new Date(a.ride_date));

  // Skip the latest 3
  const archiveRides = rides.slice(3);

  return (
    <div className="bg-background">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-primary-red mb-10 text-center">Ride Archives</h1>

        {archiveRides.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {archiveRides.map((ride) => (
              <RideTile key={ride.id} ride={ride} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">No archived rides found.</p>
        )}
      </div>
    </div>
  );
}