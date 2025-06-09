import { notFound } from 'next/navigation';
import Link from 'next/link';

// Generate static paths
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides`, { cache: 'no-store' });
  const data = await res.json();
  return data.data.map((ride) => ({ slug: ride.documentId }));
}

// Ride Detail Page
export default async function RideDetailPage({ params }) {
  const { slug } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides`, { cache: 'no-store' });
  const data = await res.json();
  const ride = data.data.find((r) => r.documentId === slug);

  if (!ride) notFound();

  const { title, ride_date, detailed_write_up } = ride;

  return (
    <section className="bg-background min-h-screen px-4 py-16 flex justify-center items-start">
      <div className="w-full max-w-5xl bg-foreground rounded-xl shadow-lg overflow-hidden flex flex-col">
        
        {/* Sticky Title + Date */}
        <div className="sticky top-0 z-20 bg-foreground px-6 pt-6 pb-4 border-b border-gray-300">
          <h1 className="text-4xl font-extrabold text-primary mb-2">{title}</h1>
          <p className="text-sm text-dark-charcoal opacity-80">
            {new Date(ride_date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Body Content */}
        <div className="px-6 py-8 overflow-y-auto max-h-[70vh] space-y-6 text-lg leading-relaxed text-dark-charcoal">
          {detailed_write_up.split('\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Back CTA */}
        <div className="px-6 py-6 border-t border-gray-200 text-center">
          <Link href="/rides">
            <button className="mt-2 inline-block bg-primary text-background font-semibold px-6 py-3 rounded-lg shadow hover:bg-secondary transition duration-300">
              ← Back to Rides
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}