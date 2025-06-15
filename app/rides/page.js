import Link from 'next/link';
import Image from 'next/image';

export default async function RidesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides?populate=featured_image`);
  const data = await res.json();
  const rides = data.data;

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rides.map((ride) => {
          const { id, title, short_description, ride_date, documentId, featured_image } = ride;
          const imageUrl = featured_image?.data?.attributes?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${featured_image.data.attributes.url}`
            : null;

          return (
            <Link href={`/rides/${documentId}`} key={id} className="block group">
              <div className="rounded-lg overflow-hidden shadow-md bg-white transition transform hover:scale-[1.02]">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-60"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-60 flex items-center justify-center text-gray-500">
                    No Image Available
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl font-bold text-primary mb-1">{title}</h2>
                  <p className="text-sm text-dark-charcoal mb-2">
                    {new Date(ride_date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-gray-700">{short_description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}