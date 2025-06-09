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

  const { title, ride_date, detailed_write_up, author } = ride;

  return (
    <div className="bg-background min-h-screen flex flex-col items-center px-6 py-12">
      <div className="max-w-3xl w-full bg-foreground rounded-lg shadow-lg p-8 relative">
        <div className="mb-6 border-b border-gray-300 pb-4">
          <h1 className="text-4xl font-bold text-primary-red">{title}</h1>
          {author && (
            <p className="text-sm text-highlight italic mb-1">
              By {typeof author === 'object' ? author.name : author}
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

        <div className="prose prose-lg text-dark-charcoal">
          {detailed_write_up.split('\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/rides">
            <button className="bg-primary-red text-grey py-3 px-6 rounded-lg font-semibold shadow hover:bg-red-700 transition">
              ← Back to Rides
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}