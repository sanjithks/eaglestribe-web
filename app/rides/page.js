import { notFound } from 'next/navigation';
import Link from 'next/link';

// Get all ride slugs for static generation
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides`, {
    cache: 'no-store',
  });
  const data = await res.json();

  return data.data.map((ride) => ({
    slug: ride.documentId,
  }));
}

// Main ride detail page
export default async function RideDetailPage({ params }) {
  const { slug } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides`, {
    cache: 'no-store',
  });
  const data = await res.json();
  const ride = data.data.find((r) => r.documentId === slug);

  if (!ride) notFound();

  const { title, ride_date, detailed_write_up } = ride;

  return (
    <div className="bg-background min-h-screen px-4 py-10 flex justify-center">
      <div className="w-full max-w-4xl bg-foreground rounded-lg shadow-lg overflow-hidden flex flex-col">
        {/* Sticky Header (Title + Date) */}
        <div className="bg-foreground px-6 py-4 sticky top-[70px] z-10 border-b border-gray-300">
          <h1 className="text-3xl font-bold text-primary-red">{title}</h1>
          <p className="text-sm text-dark-charcoal mt-1">
            {new Date(ride_date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow px-6 py-6 overflow-y-auto max-h-[70vh] prose prose-lg text-dark-charcoal">
          {detailed_write_up.split('\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Back Button */}
        <div className="px-6 py-6 text-center border-t border-gray-200">
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