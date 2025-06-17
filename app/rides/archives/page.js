import Link from 'next/link';
import Image from 'next/image';

// This function can be the same one used on your main rides page.
// For better project structure, consider moving this and RideTile to separate component files.
async function getRides() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides?populate=featured_image`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch rides');
    const ridesData = await res.json();
    return ridesData.data || [];
  } catch (error) {
    console.error('Error fetching rides:', error);
    return [];
  }
}

// You can reuse the exact same RideTile component.
function RideTile({ ride }) {
  const { title, short_description, documentId, featured_image } = ride.attributes;
  const featuredImageUrl = featured_image?.data?.attributes?.url || null;

  return (
    <Link
      href={`/rides/${documentId}`}
      className="block bg-card rounded-xl shadow-md p-6 hover:shadow-xl transition-all border border-transparent hover:border-primary"
    >
      {featuredImageUrl && (
        <div className="mb-4">
          <Image
            src={featuredImageUrl}
            alt={title}
            width={600}
            height={300}
            className="rounded-lg w-full h-48 object-cover"
          />
        </div>
      )}
      <h3 className="text-2xl font-bold text-secondary mb-2">{title}</h3>
      <p className="text-card-foreground text-opacity-80">{short_description}</p>
      <p className="mt-4 text-primary font-semibold hover:underline">Read More...</p>
    </Link>
  );
}


// This is the main page component for the archives.
export default async function ArchivesPage() {
  const rides = await getRides();

  // 1. Sort rides by date, with the newest first (same as before).
  const sortedRides = rides.sort(
    (a, b) => new Date(b.attributes.ride_date) - new Date(a.attributes.ride_date)
  );
  
  // 2. THIS IS THE KEY CHANGE: Get all rides *after* the first three.
  const archivedRides = sortedRides.slice(3);

  return (
    <section className="bg-background text-foreground px-6 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-primary">Ride Archives</h1>
          <p className="mt-4 text-lg text-foreground/80">A look back at our past journeys.</p>
          <Link href="/rides" className="mt-6 inline-block text-secondary hover:underline">
            &larr; Back to Latest Rides
          </Link>
        </div>

        {archivedRides.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {archivedRides.map((ride) => (
              <RideTile key={ride.id} ride={ride} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-foreground/70">No older rides in the archives yet.</p>
        )}
      </div>
    </section>
  );
}