import Link from 'next/link';

// Fetch ride data from Strapi
async function getRides() {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const res = await fetch(${strapiUrl}/api/rides, {
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Strapi API returned an error:', errorData);
      throw new Error(Failed to fetch rides. Status: ${res.status});
    }

    const ridesData = await res.json();
    return ridesData.data || [];
  } catch (error) {
    console.error('Error in getRides:', error);
    return [];
  }
}

// Display each ride tile
function RideTile({ ride }) {
  const { title, short_description, documentId } = ride;

  return (
    <Link href={/rides/${documentId}} className="block bg-foreground rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-secondary-brown mb-2">{title}</h3>
        <p className="text-dark-charcoal">{short_description}</p>
        <p className="mt-4 text-primary-red font-semibold hover:underline">Read More...</p>
      </div>
    </Link>
  );
}

// Renders the main rides page
export default async function RidesPage() {
  let rides = await getRides();

  // Sort by ride_date descending (newest first)
  rides = rides.sort((a, b) => new Date(b.ride_date) - new Date(a.ride_date));

  // Only show latest 3 rides
  const topThreeRides = rides.slice(0, 3);

  return (
    <div className="bg-background">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-primary-red mb-12 text-center">Latest Rides</h1>

        {topThreeRides.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {topThreeRides.map((ride) => (
              <RideTile key={ride.id} ride={ride} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">Could not load rides at this time. Please try again later.</p>
        )}

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-secondary-brown mb-4">Looking for more?</h2>
          <Link
            href="/rides/archives"
            className="inline-block bg-dark-charcoal text-foreground py-4 px-10 rounded-lg shadow-lg hover:bg-primary-red transition-colors duration-300 text-xl font-bold"
          >
            View Ride Archives
          </Link>
        </div>
      </div>
    </div>
  );
}