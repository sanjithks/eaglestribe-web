import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getRide(slug) {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const res = await fetch(`${strapiUrl}/api/rides?filters[slug][$eq]=${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch ride');

    const json = await res.json();
    return json.data[0] || null;
  } catch (error) {
    console.error('Error fetching ride:', error);
    return null;
  }
}

export default async function RideDetailPage({ params }) {
  const ride = await getRide(params.slug);

  if (!ride) return notFound();

  const { title, ride_date, detailed_write_up } = ride;

  return (
    <div className="min-h-screen bg-background text-dark-charcoal">
      <div className="container mx-auto py-12 px-6 max-w-4xl">
        {/* Title and Date (Sticky) */}
        <div className="sticky top-0 z-10 bg-background pb-4 border-b border-secondary-brown">
          <h1 className="text-4xl font-bold text-primary-red">{title}</h1>
          <p className="text-sm text-secondary-brown">{new Date(ride_date).toDateString()}</p>
        </div>

        {/* Scrollable Body */}
        <div className="mt-6 max-h-[70vh] overflow-y-auto leading-relaxed whitespace-pre-line pr-2">
          {detailed_write_up}
        </div>

        {/* Back Button */}
        <div className="mt-10 text-center">
          <Link
            href="/rides"
            className="inline-block bg-dark-charcoal text-foreground py-3 px-8 rounded-lg shadow-md hover:bg-primary-red transition-colors duration-300 text-lg font-semibold"
          >
            ← Back to Rides
          </Link>
        </div>
      </div>
    </div>
  );
}
