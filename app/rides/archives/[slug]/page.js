import { notFound } from 'next/navigation';
import Link from 'next/link';

// Generate static paths for archived rides
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides`, {
    cache: 'no-store',
  });

  const data = await res.json();

  // Skip latest 3 rides (sorted by ride_date descending)
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

  const { title, ride_date, detailed_write_up } = ride;

  return (
    <div className="bg-background min-h-screen flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-4xl bg-foreground rounded-xl shadow-xl overflow-hidden flex flex-col">
        
        {/* Sticky Title & Date */}
        <div className="sticky top-0 z-10 bg-foreground px-6 pt-6 pb-4 border-b border-gray-300">
          <h1 className="text-4xl font-bold text-primary mb-2">{title}</h1>
          <p className="text-sm text-dark-charcoal">
            {new Date(ride_date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Scrollable content */}
        <div className="px-6 py-6 overflow-y-auto max-h-[70vh] prose prose-lg text-dark-charcoal">
          {detailed_write_up?.split('\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Back button */}
        <div className="px-6 pb-6 mt-auto text-center border-t border-gray-200">
          <Link href="/rides/archives">
            <button className="mt-4 bg-primary text-white py-3 px-6 rounded-lg font-semibold shadow hover:bg-secondary transition">
              ← Back to Archives
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}