import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides`, {
    cache: 'no-store',
  });
  const data = await res.json();
  return data.data.map((ride) => ({ slug: ride.documentId }));
}

export default async function RideDetailPage({ params }) {
  const { slug } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides`, {
    cache: 'no-store',
  });
  const data = await res.json();
  const ride = data.data.find((r) => r.documentId === slug);

  if (!ride) notFound();

  const { title, ride_date, detailed_write_up, author, featured_image, ride_gallery } = ride;

  const featuredImageUrl = featured_image?.url || featured_image?.formats?.large?.url;

  return (
    <div className="bg-background min-h-screen flex flex-col items-center px-6 py-12">
      <div className="max-w-4xl w-full bg-foreground rounded-lg shadow-lg p-8 relative">
        {/* Header Section */}
        <div className="mb-6 border-b border-gray-300 pb-4 sticky top-[130px] bg-foreground z-10">
          <h1 className="text-4xl font-bold text-primary-red">{title}</h1>
          {author && (
            <p className="text-sm text-highlight italic mb-1">
              By {typeof author === 'object' ? author.name : author}
            </p>
          )}
          <p className="text-sm text-dark-charcoal">
            {new Date(ride_date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Featured Image */}
        {featuredImageUrl && (
          <div className="mb-6">
            <Image
              src={featuredImageUrl}
              alt="Ride Featured"
              width={800}
              height={500}
              className="rounded-lg object-cover w-full max-h-[500px]"
            />
          </div>
        )}

        {/* Detailed Write-up */}
        <div className="prose prose-lg text-dark-charcoal mb-12">
          {detailed_write_up.split('\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Ride Gallery */}
        {ride_gallery?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-secondary mb-6">Ride Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {ride_gallery.map((img, idx) => (
                <Image
                  key={idx}
                  src={img.url}
                  alt={`Ride gallery image ${idx + 1}`}
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full h-64"
                />
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link href="/rides">
            <button className="bg-primary-red text-white py-3 px-6 rounded-lg font-semibold shadow hover:bg-red-700 transition">
              ← Back to Rides
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}