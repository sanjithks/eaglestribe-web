// components/RideTile.js
import Link from 'next/link';
import InteractiveImage from '@/components/InteractiveImage'; // ✅ Use the new unified component

export default function RideTile({ ride, href, displayMode = 'full' }) {
  const { title, short_description, featured_image } = ride;

  return (
    <Link href={href || '#'} className="group block">
      <div className="relative aspect-video w-full bg-foreground/10 rounded-xl shadow-md overflow-hidden flex items-center justify-center">
        {featured_image?.url ? (
          // This will now be the interactive canvas, but silent by default.
          <InteractiveImage image={featured_image} />
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