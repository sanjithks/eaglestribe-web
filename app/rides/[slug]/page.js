'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function RideDetailPage() {
  const { slug } = useParams();
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRide = async () => {
      try {
        const res = await fetch(`https://your-strapi-url/api/rides?filters[documentId][$eq]=${slug}&populate=featured_image,ride_gallery`);
        const data = await res.json();
        const rideData = data.data[0]?.attributes;
        if (rideData) {
          setRide(rideData);
        }
      } catch (err) {
        console.error('Failed to fetch ride:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRide();
  }, [slug]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!ride) return <div className="text-center mt-10 text-red-500">Ride not found.</div>;

  const { title, ride_date, detailed_write_up, featured_image, ride_gallery } = ride;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-dark-charcoal">
      <Link href="/rides" className="text-white bg-dark-charcoal px-4 py-2 rounded hover:bg-black transition mb-8 inline-block">
        ← Back to Rides
      </Link>

      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-lg text-gray-600">{new Date(ride_date).toLocaleDateString()}</p>
      </div>

      {featured_image?.url && (
        <div className="mb-8">
          <img
            src={featured_image.url}
            alt={featured_image.name || 'Ride image'}
            className="w-full h-auto rounded shadow"
          />
        </div>
      )}

      <div className="prose max-w-none text-lg leading-relaxed whitespace-pre-wrap mb-10">
        {detailed_write_up}
      </div>

      {ride_gallery?.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Photo Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ride_gallery.map((image) => (
              <img
                key={image.id}
                src={image.url}
                alt={image.name || 'Gallery image'}
                className="w-full h-auto rounded shadow"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}