import Link from 'next/link';
import Image from 'next/image';

// This function fetches the ride data from your Strapi API.
// It is identical to the one on your main rides page.
async function getRides() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides?populate=featured_image`, {
      cache: 'no-store', // Fetches fresh data on each request.
    });
    if (!res.ok) throw new Error('Failed to fetch rides');
    const ridesData = await res.json();
    // Assuming Strapi v4 structure where data is in `data.attributes`
    return ridesData.data || []; 
  } catch (error) {
    console.error('Error fetching rides:', error);
    return [];
  }
}

// This is the exact same RideTile component. 
// It is recommended to move this to a shared components folder later.
function RideTile({ ride }) {
  // Destructure properties from ride.attributes for Strapi v4.
  const { title, short_description, documentId, ride_date, featured_image } = ride.attributes;

  // Access the image URL correctly from the populated data.
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

// This is the main page component for the Archives.
export default async function ArchivesPage() {
  const rides = await getRides();

  // Sort rides by date, with the newest first.
  const sortedRides = rides.sort(
    (a, b) => new Date(b.attributes.ride_date) - new Date(a.attributes.ride_date)
  );
  
  // LOGIC CHANGE: Instead of top 3, get all rides FROM the 4th one onwards.
  const archivedRides = sortedRides.slice(3);

  return (
    <section className="bg-background text-foreground px-6 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* TEXT CHANGE: Update the title to reflect the page content. */}
        <h1 className="text-5xl font-extrabold text-primary text-center mb-16">Ride Archives</h1>

        {/* LOGIC CHANGE: Check and map over 'archivedRides' instead of 'topThreeRides'. */}
        {archivedRides.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {archivedRides.map((ride) => (
              <RideTile key={ride.id} ride={ride} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-foreground/70">No older rides found in the archives.</p>
        )}

        {/* TEXT & LINK CHANGE: The button now links back to the main rides page. */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-secondary mb-4">Want the latest news?</h2>
          <Link
            href="/rides"
            className="inline-block bg-primary text-white py-4 px-10 rounded-lg shadow-md hover:bg-primary/90 transition duration-300 text-xl font-bold"
          >
            View Latest Rides
          </Link>
        </div>
      </div>
    </section>
  );
}