import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides`);
  const data = await res.json();

  return data.data.map((ride) => ({
    slug: ride.documentId,
  }));
}

export default async function RideDetailPage({ params }) {
  const { slug } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/rides?populate=featured_image,ride_gallery,author`
  );
  const data = await res.json();

  if (!data?.data) notFound();

  const ride = data.data.find((r) => r.documentId === slug);
  if (!ride) notFound();

  const { title, ride_date, detailed_write_up, featured_image, ride_gallery, author } = ride;

  const featuredImageUrl = featured_image
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${featured_image.url}`
    : null;

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-2">{title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {new Date(ride_date).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>

      {featuredImageUrl && (
        <Image
          src={featuredImageUrl}
          alt={title}
          width={1000}
          height={500}
          className="w-full rounded-lg mb-6 object-cover"
        />
      )}

      <div className="prose text-gray-800">
        {detailed_write_up.split('\n').map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

      <div className="mt-10">
        <Link href="/rides">
          <button className="bg-primary text-white px-6 py-3 rounded-lg">← Back to Rides</button>
        </Link>
      </div>
    </div>
  );
}