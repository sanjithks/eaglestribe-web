// components/RideTile.js
import Link from 'next/link';
import Image from 'next/image';

// Accept the new `isArchive` prop, defaulting to false
export default function RideTile({ ride, isArchive = false }) {
  const { title, short_description, documentId, featured_image } = ride;

  const featuredImageUrl = featured_image?.url || null;
  const imageAlt = featured_image?.alternativeText || title;

  // ✅ FIX: Build the link dynamically. If it's an archive tile, add the search param.
  const href = isArchive 
    ? `/rides/${documentId}?from=archives` 
    : `/rides/${documentId}`;

  return (
    // Use the dynamic `href` variable here
    <Link
      href={href}
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