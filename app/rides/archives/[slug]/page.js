import { notFound } from 'next/navigation';
import Link from 'next/link';

// Generate static paths for archived rides
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides`, {
    cache: 'no-store',
  });

  const data = await res.json();

  const rides = data.data.sort((a, b) => new Date(b.ride_date) - new Date(a.ride_date));
  const archivedRides = rides.slice(3);

  return archivedRides.map((ride) => ({
    slug: ride.documentId,
  }));
}

// Archived ride detail page
export default async function ArchivedRideDetailPage({ params }) {
  const { slug } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides`, {
    cache: 'no-store',
  });

  const data = await res.json();
  const rides = data.data.sort((a, b) => new Date(b.ride_date) - new Date(a.ride_date));
  const archivedRides = rides.slice(3);
  const ride = archivedRides.find((r) => r.documentId === slug);

  if (!ride) notFound();

  const { title, ride_date, detailed_write_up, author } = ride;

  return (
    <div className="bg-background min-h-screen flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-4xl bg-foreground rounded-xl shadow-xl p-8 relative">

        {/* Sticky Header */}
        <div className="sticky top-[100px] bg-foreground z-10 pb-4 border-b border-gray-300">
          <h1 className="text-4xl font-bold text-primary mb-1">{title}</h1>
          {author && <p className="text-sm text-secondary mb-1">By {author}</p>}
          <p className="text-sm text-dark-charcoal">
            {new Date(ride_date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Content */}
        <div className="mt-6 prose prose-lg text-dark-charcoal">
          {detailed_write_up?.split('\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Back button */}
        <div className="mt-12 text-center border-t border-gray-200 pt-6">
          <Link href="/rides/archives">
            <button className="bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold shadow hover:bg-primary transition">
              ← Back to Archives
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}