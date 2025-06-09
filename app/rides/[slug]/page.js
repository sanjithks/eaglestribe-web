import { notFound } from 'next/navigation';
import Link from 'next/link';

// Fetch all ride slugs
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides`, {
    cache: 'no-store',
  });
  const data = await res.json();

  return data.data.map((ride) => ({
    slug: ride.documentId,
  }));
}

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
    <div className="bg-background min-h-screen px-6 py-12 flex justify-center">
      <div className="w-full max-w-3xl bg-foreground rounded-lg shadow-lg overflow-hidden flex flex-col max-h-[85vh]">

        {/* Sticky Header */}
        <div className="bg-foreground px-8 pt-8 pb-4 sticky top-0 z-10 border-b border-gray-300">
          <h1 className="text-4xl font-bold text-primary-red mb-1">{title}</h1>
          <p className="text-sm text-dark-charcoal">
            {new Date(ride_date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 prose prose-lg text-dark-charcoal">
          {detailed_write_up.split('\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Back to Rides */}
        <div className="bg-foreground px-8 py-4 border-t border-gray-300 text-center sticky bottom-0 z-10">
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