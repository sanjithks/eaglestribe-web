import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// ✅ Generate static paths
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides`);
  const data = await res.json();
  return data.data.map((ride) => ({ slug: ride.documentId }));
}

// ✅ Ride detail page
export default async function RideDetailPage({ params }) {
  const { slug } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides?populate=featured_image,ride_gallery`
  );
  const data = await res.json();

  const ride = data.data.find((r) => r.documentId === slug);

  if (!ride) notFound();

  const {
    title,
    ride_date,
    detailed_write_up,
    author,
    featured_image,
    ride_gallery,
  } = ride;

  const featuredImageUrl = featured_image?.formats?.large?.url || featured_image?.url;
  const fullFeaturedImageUrl = featuredImageUrl
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${featuredImageUrl}`
    : null;

  return (
    <div className="bg-background text-foreground min-h-screen px-6 py-12">
      <div className="max-w-5xl mx-auto bg-foreground rounded-xl shadow-lg overflow-hidden">
        {/* Sticky Title Section */}
        <div className="sticky top-24 bg-foreground px-6 pt-6 pb-4 z-10 border-b border-gray-300">
          <h1 className="text-4xl font-bold text-primary mb-1">{title}</h1>
          {author && (
            <p className="text-sm text-highlight italic mb-1">
              By {typeof author === 'string' ? author : author.name}
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
        {fullFeaturedImageUrl && (
          <Image
            src={fullFeaturedImageUrl}
            alt={title}
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
        )}

        {/* Detailed Write-up */}
        <div className="prose prose-lg px-6 py-8 text-dark-charcoal">
          {detailed_write_up?.split('\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Ride Gallery */}
        {ride_gallery?.length > 0 && (
          <div className="px-6 pb-12">
            <h2 className="text-2xl font-bold mb-4 text-secondary">Ride Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ride_gallery.map((img, i) => (
                <Image
                  key={i}
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${img.url}`}
                  alt={`Gallery Image ${i + 1}`}
                  width={600}
                  height={400}
                  className="rounded-lg shadow object-cover w-full h-64"
                />
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="px-6 pb-6 text-center border-t border-gray-200">
          <Link href="/rides">
            <button className="mt-4 bg-primary text-white py-3 px-6 rounded-lg font-semibold shadow hover:bg-primary/80 transition">
              ← Back to Rides
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}