// components/RideTile.js
import Link from 'next/link';
// We no longer need the standard Image component here
// import Image from 'next/image';
import ProtectedCanvasImage from '@/components/ProtectedCanvasImage'; // ✅ Import the protected component

export default function RideTile({ ride, isArchive = false }) {
  const { title, short_description, documentId, featured_image } = ride;

  const featuredImageUrl = featured_image?.url || null;
  const imageAlt = featured_image?.alternativeText || title;

  const href = isArchive 
    ? `/rides/archives/${documentId}?from=archives` 
    : `/rides/${documentId}`;

  return (
    <Link
      href={href}
      className="block bg-card rounded-xl shadow-lg p-6 hover:shadow-primary/20 transition-all border border-transparent hover:border-primary/50 group"
    >
      <div className="mb-4 aspect-video relative bg-foreground/10 rounded-lg flex items-center justify-center">
        {featuredImageUrl ? (
          // ✅ Use the ProtectedCanvasImage for the tile's featured image
          <ProtectedCanvasImage
            src={featuredImageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <p className="text-foreground/50">No Image</p>
        )}
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-2 line-clamp-2">{title}</h3>
      <p className="text-card-foreground/80 line-clamp-3">{short_description}</p>
      <p className="mt-4 text-primary font-semibold group-hover:underline">Read More...</p>
    </Link>
  );
}