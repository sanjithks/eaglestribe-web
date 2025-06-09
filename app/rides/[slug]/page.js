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

  if (!ride) {
    notFound();
  }

  const { title, ride_date, detailed_write_up } = ride;

  return (
    <div className="bg-background min-h-screen flex flex-col items-center px-6 py-12 relative">
      <div className="max-w-3xl w-full bg-foreground rounded-lg shadow-lg p-8 relative">
        
        {/* Sticky Title and Date */}
        <div className="sticky top-0 bg-foreground z-10 pb-4 border-b border-gray-300">
          <h1 className="text-4xl font-bold text-primary-red mb-2">{title}</h1>
          <p className="text-sm text-dark-charcoal">
            {new Date(ride_date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="mt-6 max-h-[70vh] overflow-y-auto prose prose-lg text-dark-charcoal">
          {detailed_write_up.split('\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>

      {/* Spacer to avoid footer overlap */}
      <div className="h-20" />

      {/* Floating Back Button */}
      <div className="fixed bottom-6 inset-x-0 flex justify-center z-40">
        <Link href="/rides">
          <button className="bg-primary-red text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition">
            ← Back to Rides
          </button>
        </Link>
      </div>
    </div>
  );
}