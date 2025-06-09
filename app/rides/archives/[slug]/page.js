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

  if (!ride) {
    notFound();
  }

  const { title, ride_date, detailed_write_up } = ride;

  return (
    <div className="bg-background min-h-screen flex flex-col items-center px-6 py-12">
      <div className="max-w-3xl w-full bg-foreground rounded-lg shadow-lg p-8 relative">
        {/* Fixed Title and Date */}
        <div className="sticky top-[140px] bg-foreground z-10 pb-4 border-b border-gray-300">
          <h1 className="text-4xl font-bold text-primary-red mb-2">{title}</h1>
          <p className="text-sm text-dark-charcoal">
            {new Date(ride_date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Scrollable Write-up */}
        <div className="mt-6 max-h-[70vh] overflow-y-auto prose prose-lg text-dark-charcoal">
          {detailed_write_up?.split('\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Back to Archives Button */}
        <div className="mt-8 text-center">
          <Link href="/rides/archives">
            <button className="bg-primary-red text-white py-3 px-6 rounded-lg font-semibold shadow hover:bg-red-700 transition">
              ← Back to Archives
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}