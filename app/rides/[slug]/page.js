import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides`, { cache: 'no-store' });
  const data = await res.json();
  return data.data.map((ride) => ({ slug: ride.documentId }));
}

export default async function RideDetailPage({ params }) {
  const { slug } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides`, { cache: 'no-store' });
  const data = await res.json();
  const ride = data.data.find((r) => r.documentId === slug);

  if (!ride) notFound();

  const { title, ride_date, detailed_write_up } = ride;

  return (
    <div className="bg-background min-h-screen flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-4xl bg-foreground rounded-lg shadow-xl overflow-hidden flex flex-col">
        
        {/* Fixed Title and Date (visually stays in place) */}
        <div className="absolute top-0 left-0 w-full bg-foreground z-30 px-6 pt-6 pb-4 border-b border-gray-300">
          <h1 className="text-4xl font-bold text-primary-red mb-2">{title}</h1>
          <p className="text-sm text-dark-charcoal">
            {new Date(ride_date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Scrollable Area with Top Padding */}
        <div className="px-6 pt-[140px] pb-6 overflow-y-auto max-h-[70vh] prose prose-lg text-dark-charcoal">
          {detailed_write_up.split('\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Back Button */}
        <div className="px-6 pb-6 mt-auto text-center border-t border-gray-200">
          <Link href="/rides">
            <button className="mt-4 bg-primary-red text-white py-3 px-6 rounded-lg font-semibold shadow hover:bg-red-700 transition">
              ← Back to Rides
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}