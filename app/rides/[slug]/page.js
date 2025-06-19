// @/app/rides/[slug]/page.js
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getRide } from '@/lib/data';
import ProtectedImage from '@/components/ProtectedImage';

export async function generateMetadata({ params }) {
  const ride = await getRide(params.slug);
  return {
    title: `${ride?.title || "Ride Details"} | Eagles Tribe MC`,
    description: ride?.short_description || "A ride from Eagles Tribe MC.",
  };
}

export default async function RideDetailPage({ params, searchParams }) {
  const ride = await getRide(params.slug);
  if (!ride) notFound();
  
  const fromArchives = searchParams.from === 'archives';
  const backHref = fromArchives ? '/rides/archives' : '/rides';

  // We only need these fields now
  const { title, ride_date, author, rich_text_markdown, slug_cover } = ride;

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md shadow-sm border-b border-white/10">
        <div className="max-w-7xl w-full mx-auto px-4 py-3 flex justify-between items-center">
          <Link href={backHref} className="flex items-center gap-2 text-primary hover:underline transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Back
          </Link>
          <div className="text-right">
            <h1 className="text-xl md:text-2xl font-semibold text-secondary">{title}</h1>
            <p className="text-xs md:text-sm text-foreground/70">
              {new Date(ride_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              {author && <span className="italic"> by {author}</span>}
            </p>
          </div>
        </div>
      </div>

      {slug_cover && (
        <div className="relative my-6 max-w-5xl mx-auto px-4 aspect-video bg-foreground/10 rounded-lg flex items-center justify-center overflow-hidden">
          <ProtectedImage
            src={slug_cover.url}
            alt={slug_cover.alternativeText || title}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <article className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{rich_text_markdown}</ReactMarkdown>
        </article>
        
        {/* ✅ The entire gallery grid section has been removed from here. */}
      </div>
    </main>
  );
}