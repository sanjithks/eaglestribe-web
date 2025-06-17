import Link from 'next/link';
import Image from 'next/image';

export default function RideTile({ ride }) {
  // Destructure properties from ride.attributes for Strapi v4.
  const { title, short_description, documentId, featured_image } = ride.attributes;

  // Access the image URL correctly from the populated data.
  const featuredImageUrl = featured_image?.data?.attributes?.url || null;
  const imageAlt = featured_image?.data?.attributes?.alternativeText || title;

  return (
    <Link
      href={`/rides/${documentId}`}
      className="block bg-card rounded-xl shadow-lg p-6 hover:shadow-primary/20 transition-all border border-transparent hover:border-primary/50"
    >
      {featuredImageUrl && (
        <div className="mb-4 aspect-video relative">
          <Image
            src={featuredImageUrl}
            alt={imageAlt}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      )}
      <h3 className="text-2xl font-bold text-secondary mb-2 line-clamp-2">{title}</h3>
      <p className="text-card-foreground/80 line-clamp-3">{short_description}</p>
      <p className="mt-4 text-primary font-semibold group-hover:underline">Read More...</p>
    </Link>
  );
}