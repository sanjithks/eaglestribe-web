import Link from 'next/link';
import Image from 'next/image';

// This function stays the same
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

// This component also stays the same
function RideTile({ ride }) {
  const { title, short_description, documentId, featured_image } = ride;
  const featuredImageUrl = featured_image?.url || null; // This is still a guess

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
            <p className="text-gray-500">Image not found</p>
        </div>
      )}
      <h3 className="text-2xl font-bold text-secondary mb-2">{title}</h3>
      <p className="text-foreground text-opacity-80">{short_description}</p>
      <p className="mt-4 text-primary font-semibold hover:underline">Read More...</p>
    </Link>
  );
}

// Main page - THIS IS THE MODIFIED PART
export default async function RidesPage() {
  const rides = await getRides();

  return (
    <section className="bg-background text-foreground px-6 py-16 min-h-screen">

      {/* ================================================================== */}
      {/* =================== VISUAL DEBUGGING BOX ======================= */}
      <div style={{
        backgroundColor: 'white',
        color: 'black',
        padding: '20px',
        margin: '20px auto',
        borderRadius: '10px',
        border: '3px solid red',
        maxWidth: '1200px'
      }}>
        <h2 style={{ color: 'red', fontWeight: 'bold', fontSize: '24px', marginBottom: '10px' }}>
          DEBUGGING INFORMATION:
        </h2>
        <p style={{fontStyle: 'italic'}}>
          Please copy all the text inside the box below and send it to me.
        </p>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
          {rides && rides.length > 0 ? JSON.stringify(rides[0], null, 2) : 'ERROR: No ride data found. The API might be returning an empty array or an error.'}
        </pre>
      </div>
      {/* ================================================================== */}
      {/* ================================================================== */}


      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-primary text-center mb-16">Latest Rides</h1>
        
        {rides.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {rides.slice(0, 3).map((ride) => (
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