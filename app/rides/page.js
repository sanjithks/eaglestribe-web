import Link from 'next/link';
import Image from 'next/image';

async function getRides() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides?populate=featured_image`,
      { cache: 'no-store' }
    );
    if (!res.ok) throw new Error('Failed to fetch rides');
    const ridesData = await res.json();
    return ridesData.data || [];
  } catch (error) {
    console.error('Error fetching rides:', error);
    return [];
  }
}

function RideTile({ ride }) {
  const { title, short_description, attributes } = ride;
  const documentId = attributes.documentId;

  const featuredImageUrl = attributes.featured_image?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${attributes.featured_image.data.attributes.url}`
    : null;

  return (
    <Link
      href={`/rides/${documentId}`}
      className="block bg-foreground rounded-xl shadow-md p-6 hover:shadow-xl transition-all border border-transparent hover:border-primary"
    >
      {featuredImageUrl ? (
        <div className="mb-4">
          <Image
            src={featuredImageUrl}
            alt={title}
            width={600}
            height={300}
            className="rounded-lg w-full h-48 object-cover"
          />
        </div>
      ) : (
        <div className="mb-4 w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">No Image</p>
        </div>
      )}

      <h3 className="text-2xl font-bold text-secondary mb-2">{title}</h3>
      <p className="text-foreground text-opacity-80">{short_description}</p>
      <p className="mt-4 text-primary font-semibold hover:underline">Read More...</p>
    </Link>
  );
}

export default async function RidesPage() {
  const rides = (await getRides()).sort(
    (a, b) => new Date(b.attributes.ride_date) - new Date(a.attributes.ride_date)
  );
  const topThreeRides = rides.slice(0, 3);

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
            className="inline-block bg-dark-charcoal text-background py-4 px-10 rounded-lg shadow-md hover:bg-primary transition duration-300 text-xl font-bold"
          >
            View Ride Archives
          </Link>
        </div>
      </div>
    </section>
  );
}