import Link from 'next/link';
import Image from 'next/image';

// This function will run on the server to fetch data from Strapi
async function getRides() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  // We use Strapi's 'populate' parameter to make sure the 'featured_image' data is included in the response.
  // We also sort by ride_date in descending order to get the latest rides first.
  const res = await fetch(`${strapiUrl}/api/rides?populate=featured_image&sort=ride_date:desc`, {
    // This enables caching for better performance. 'no-store' would fetch fresh data on every request.
    cache: 'no-store', 
  });

  // Handle errors if the fetch fails
  if (!res.ok) {
    throw new Error('Failed to fetch rides from Strapi');
  }

  const ridesData = await res.json();
  return ridesData.data; // Strapi wraps the array in a 'data' object
}


// The RideTile component now needs to handle the Strapi data structure
function RideTile({ ride }) {
    // Destructure attributes for easier access
    const { title, description } = ride.attributes;
    
    // Get the image URL. Strapi nests image data deeply.
    // We add a fallback to a placeholder if the image is missing.
    const imageUrl = ride.attributes.featured_image?.data?.attributes?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${ride.attributes.featured_image.data.attributes.url}`
      : "/images/placeholder.png"; // Make sure you have a placeholder image at public/images/placeholder.png

    return (
        <div className="bg-foreground rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl">
            <div className="relative h-56 w-full">
                <Image
                    src={imageUrl}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-bold text-secondary-brown mb-2">{title}</h3>
                <p className="text-dark-charcoal">{description}</p>
                <button className="mt-4 text-primary-red font-semibold hover:underline">Read More...</button>
            </div>
        </div>
    )
}

// Our page component is now an 'async' function
export default async function RidesPage() {
    // We call the getRides function and wait for the data
    const rides = await getRides();

    return (
        <div className="bg-background">
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-5xl font-bold text-primary-red mb-12 text-center">Latest Rides</h1>

                {/* We check if there are any rides before trying to display them */}
                {rides && rides.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {rides.map(ride => (
                            <RideTile key={ride.id} ride={ride} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-lg">No rides have been posted yet. Check back soon!</p>
                )}
                
                <div className="mt-20 text-center">
                    <h2 className="text-3xl font-bold text-secondary-brown mb-4">Looking for more?</h2>
                    <Link href="/rides/archives" className="inline-block bg-dark-charcoal text-foreground py-4 px-10 rounded-lg shadow-lg hover:bg-primary-red transition-colors duration-300 text-xl font-bold">
                        View Ride Archives
                    </Link>
                </div>
            </div>
        </div>
    );
}