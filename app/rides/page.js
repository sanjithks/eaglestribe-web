import Image from "next/image";
import Link from "next/link";

// Fetch rides
async function getRides() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides?populate=featured_image`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error("Failed to fetch rides");
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Error fetching rides:", err);
    return [];
  }
}

// RIDE TILE
function RideTile({ ride }) {
  const { title, short_description, documentId, featured_image } = ride;

  const imageUrl = featured_image?.formats?.medium?.url || featured_image?.url;
  const fullUrl = imageUrl ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}` : null;

  return (
    <Link
      href={`/rides/${documentId}`}
      className="block bg-foreground rounded-xl shadow-md p-6 hover:shadow-xl transition-all border border-transparent hover:border-primary"
    >
      {fullUrl && (
        <div className="mb-4 rounded overflow-hidden">
          <Image
            src={fullUrl}
            alt={title}
            width={400}
            height={250}
            className="w-full h-56 object-cover rounded"
          />
        </div>
      )}
      <h3 className="text-2xl font-bold text-secondary mb-2">{title}</h3>
      <p className="text-foreground text-opacity-80">{short_description}</p>
      <p className="mt-4 text-primary font-semibold hover:underline">Read More...</p>
    </Link>
  );
}

// PAGE
export default async function RidesPage() {
  const rides = (await getRides()).sort(
    (a, b) => new Date(b.ride_date) - new Date(a.ride_date)
  );

  const latestRides = rides.slice(0, 3);

  return (
    <section className="bg-background text-foreground px-6 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-primary text-center mb-16">
          Latest Rides
        </h1>

        {latestRides.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {latestRides.map((ride) => (
              <RideTile key={ride.id} ride={ride} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-dark-charcoal">
            No rides available right now.
          </p>
        )}

        {/* Archives CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-secondary mb-4">
            Looking for more?
          </h2>
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