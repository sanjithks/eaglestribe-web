import { notFound } from 'next/navigation';

async function getRide(slug) {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const res = await fetch(`${strapiUrl}/api/rides`, { cache: 'no-store' });
    const data = await res.json();
    return data.data?.find(ride => ride.documentId === slug || String(ride.id) === slug);
  } catch (err) {
    console.error("Error fetching ride:", err);
    return null;
  }
}

export default async function RideDetailPage({ params }) {
  const ride = await getRide(params.slug);

  if (!ride) return notFound();

  const { title, ride_date, detailed_write_up } = ride;

  return (
    <div className="bg-background px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-primary-red mb-4">{title}</h1>
      <p className="text-sm text-dark-charcoal mb-6">
        {ride_date && new Date(ride_date).toLocaleDateString()}
      </p>
      <div className="text-lg text-dark-charcoal whitespace-pre-line">
        {detailed_write_up}
      </div>
    </div>
  );
}