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

// Ride Tile component
function RideTile({ ride }) {
  const { title, short_description, documentId } = ride;

  return (
    <Link
      href={`/rides/${documentId}`}
      className="block bg-foreground rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
    >
      <div className="p-6">
        <h3 className="text-2xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-dark-charcoal text-base">{short_description}</p>
        <p className="mt-4 text-primary font-semibold hover:underline">Read More...</p>
      </div>
    </Link>
  );
}

// Archive Page
export default async function ArchivesPage() {
  let rides = await getRides();

  // Sort newest to oldest and exclude latest 3
  rides = rides.sort((a, b) => new Date(b.ride_date) - new Date(a.ride_date));
  const archiveRides = rides.slice(3);

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-primary text-center mb-12">Ride Archives</h1>

        {archiveRides.length > 0 ? (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {archiveRides.map((ride) => (
              <RideTile key={ride.id} ride={ride} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-dark-charcoal opacity-75">
            No archived rides found.
          </p>
        )}
      </div>
    </div>
  );
}