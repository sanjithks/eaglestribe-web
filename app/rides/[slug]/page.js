import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Prose } from 'next/dist/lib/metadata/types/metadata-types';

// Your generateStaticParams and data fetching functions are fine and can remain the same.

// ... (keep your generateStaticParams function here) ...

export default async function RideDetailPage({ params }) {
  // ... (keep your data fetching logic here) ...

  const { title, ride_date, detailed_write_up } = ride;

  return (
    // STEP 1: Main Page Container
    // We add top and bottom padding here to create space for your site's sticky Header and Footer.
    <div className="bg-background flex justify-center items-center min-h-screen px-4 pt-28 pb-32">

      {/* STEP 2: The Content Card (The "Window")
          This card now has a defined height relative to the viewport (h-[85vh]) 
          and 'overflow-hidden' to contain everything inside it.
      */}
      <div className="relative max-w-3xl w-full h-[85vh] bg-foreground rounded-lg shadow-2xl flex flex-col overflow-hidden">
        
        {/* STEP 3: The Header of the Card
            This part contains the title and date. It has padding and a border. 
            It is NOT sticky itself anymore.
        */}
        <div className="p-6 md:p-8 border-b border-gray-300 flex-shrink-0">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-red mb-2">{title}</h1>
          <p className="text-sm text-dark-charcoal">
            {new Date(ride_date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* STEP 4: The Scrollable Content Area
            This div takes up the remaining space ('flex-grow') and is the ONLY part that scrolls.
        */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8">
          <div className="prose prose-lg max-w-none text-dark-charcoal">
            {detailed_write_up.split('\n').map((para, idx) => (
              // Using a div with a bottom margin feels more like a blog post
              <p key={idx} className="mb-4">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* STEP 5: Floating Back Button
          It is still 'fixed' to the viewport for the floating effect, but the padding on the
          main container (pb-32) ensures it won't overlap the footer content.
      */}
      <div className="fixed bottom-8 z-20">
        <Link href="/rides">
          <button className="bg-primary-red text-white py-3 px-6 rounded-full font-semibold shadow-xl hover:bg-secondary-brown transition-transform hover:scale-105">
            ← Back to Rides
          </button>
        </Link>
      </div>
    </div>
  );
}