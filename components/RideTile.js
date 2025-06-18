// components/RideTile.js
import Link from 'next/link';
import ProtectedCanvasImage from '@/components/ProtectedCanvasImage';

export default function RideTile({ ride, href, displayMode = 'full' }) {
  // Now we can be confident these properties exist because of our flattening logic
  const { title, short_description, documentId, featured_image } = ride;

  const featuredImageUrl = featured_image?.url || null;
  const imageAlt = featured_image?.alternativeText || title;

  return (
    // The Link now uses the specific `href` prop passed to it from the page
    <Link
      href={href || '#'}
      className="group block"
    >
      <div className="relative aspect-[4/3] w-full bg-foreground/10 rounded-xl shadow-md overflow-hidden flex items-center justify-center">
        {featuredImageUrl ? (
          <ProtectedCanvasImage
            src={featuredImageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-foreground/50">No Image</p>
        )}
      </div>
      
      <h3 className="mt-4 text-lg font-bold text-center text-secondary transition-colors group-hover:text-primary">
        {title}
      </h3>

      {displayMode === 'full' && (
        <div className="text-left mt-4 p-6 bg-card rounded-xl shadow-lg">
          <p className="text-card-foreground/80 line-clamp-3">{short_description}</p>
          <p className="mt-4 text-primary font-semibold group-hover:underline">Read More...</p>
        </div>
      )}
    </Link>
  );
}