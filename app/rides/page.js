import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function RidesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides?sort=ride_date:desc&pagination[limit]=3&populate=featured_image`);
  if (!res.ok) {
    throw new Error('Failed to fetch rides');
  }

  const data = await res.json();
  const rides = data?.data || [];

  return (
    <div className="bg-background text-foreground min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-10 text-center">Latest Rides</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {rides.map((ride) => {
            const imageUrl = ride.featured_image?.formats?.medium?.url || ride.featured_image?.url;
            const fullImageUrl = imageUrl ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}` : null;

            return (
              <Link
                key={ride.documentId}
                href={`/rides/${ride.documentId}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {fullImageUrl && (
                  <Image
                    src={fullImageUrl}
                    alt={ride.title}
                    width={600}
                    height={400}
                    className="w-full h-60 object-cover"
                  />
                )}
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-primary group-hover:underline mb-2">{ride.title}</h2>
                  <p className="text-sm text-dark-charcoal mb-2">
                    {new Date(ride.ride_date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-highlight">{ride.short_description}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Link to Archives */}
        <div className="text-center mt-16">
          <Link
            href="/rides/archives"
            className="inline-block bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/80 transition"
          >
            View All Past Rides →
          </Link>
        </div>
      </div>
    </div>
  );
}