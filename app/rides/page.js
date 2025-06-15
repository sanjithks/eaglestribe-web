import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function RidesPage() {
  let rides = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides?populate=featured_image`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch rides');

    const data = await res.json();
    rides = data?.data || [];

  } catch (error) {
    console.error('Error fetching rides:', error);
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Latest Rides</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {rides.map((ride) => {
          const imageUrl = ride?.attributes?.featured_image?.data?.attributes?.url;
          const fullImageUrl = imageUrl
            ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`
            : '/placeholder.jpg';

          return (
            <Link key={ride.id} href={`/rides/${ride.attributes.documentId}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {imageUrl && (
                  <Image
                    src={fullImageUrl}
                    alt={ride.attributes.title}
                    width={800}
                    height={400}
                    className="w-full h-60 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-primary mb-1">
                    {ride.attributes.title}
                  </h2>
                  <p className="text-sm text-dark-charcoal mb-2">
                    {new Date(ride.attributes.ride_date).toLocaleDateString('en-GB')}
                  </p>
                  <p className="text-gray-600">{ride.attributes.short_description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}