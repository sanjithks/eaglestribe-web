import Link from 'next/link';
import Image from 'next/image';

// Fetch ride data from Strapi
async function getRides() {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const res = await fetch(`${strapiUrl}/api/rides?populate=featured_image&sort=ride_date:desc`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Strapi API returned an error:', errorData);
      throw new Error(`Failed to fetch rides. Status: ${res.status}`);
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
  if (!ride?.attributes) return null;

  const { title, short_description } = ride.attributes;
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const imageUrl = ride.attributes.featured_image?.data?.attributes?.url
    ? `${strapiUrl}${ride.attributes.featured_image.data.attributes.url}`
    : "/images/placeholder.png"; // Local placeholder if no image

  return (
    <div className="bg-foreground rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl">
      <div className="relative h-56 w-full">
        <Image
          src={imageUrl}
          alt={title || 'Ride image'}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-secondary-brown mb-2">{title}</h3>
        <p className="text-dark-charcoal">{short_description}</p>
        <button className="mt-4 text-primary-red font-semibold hover:underline">Read More...</button>
      </div>
    </div>
  );
}

// Renders the main rides page
export default async function RidesPage() {
  const rides = await getRides();

  return (
    <div className="bg-background">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-primary-red mb-12 text-center">Latest Rides</h1>

        {rides.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {rides.map((ride) => (
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
