import Link from 'next/link';

async function getRides() {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const res = await fetch(`${strapiUrl}/api/rides`, { cache: 'no-store' });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Strapi API error:', errorData);
      throw new Error(`Failed to fetch rides. Status: ${res.status}`);
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

function RideTile({ ride }) {
  if (!ride) return null;

  const { title, short_description, detailed_write_up } = ride;

  const previewText = detailed_write_up
    ? detailed_write_up.slice(0, 150) + '...'
    : '';

  return (
    <div className="bg-foreground rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-2xl">
      <h3 className="text-2xl font-bold text-secondary-brown mb-2">{title}</h3>
      <p className="text-dark-charcoal mb-2">{short_description}</p>
      <p className="text-dark-charcoal text-sm">{previewText}</p>
      <button className="mt-4 text-primary-red font-semibold hover:underline">Read More...</button>
    </div>
  );
}

export default async function RidesPage() {
  let rides = await getRides();

  // Sort rides by date (descending)
  rides = rides.sort((a, b) => new Date(b.ride_date) - new Date(a.ride_date));

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
          <p className="text-center text-lg">No rides found. Please try again later.</p>
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
