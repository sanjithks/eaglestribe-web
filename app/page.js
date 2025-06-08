import Image from 'next/image';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src="/images/hero-riders.jpeg"
          alt="Eagles Tribe MC Riders"
          layout="fill"
          objectFit="cover"
          quality={85}
          className="-z-10"
        />
        <div className="bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-wider">WELCOME TO EAGLES TRIBE</h1>
          <p className="text-lg md:text-2xl mt-4">MOTORCYCLE CLUB</p>
        </div>
      </div>

      {/* Welcome Content Section */}
      <div className="bg-foreground">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-4xl font-bold text-primary-red mb-4">
            A New Beginning for a Band of Brothers
          </h2>
          <div className="max-w-4xl mx-auto text-dark-charcoal space-y-4 text-lg">
            <p>
              Founded in April 2024, Eagles Tribe MC is more than just a motorcycle club; it’s a brotherhood of men united by a shared passion for riding and a commitment to mutual support and respect. While we are a new club, our roots run deep with experienced riders who have journeyed together for years. We are a non-political, family-oriented group that values freedom, camaraderie, and the open road.
            </p>
            <p>
              Our tribe is built on the principles of loyalty, honor, and integrity. We ride with pride, embracing the spirit of adventure that each journey brings. Whether it’s a short local ride or a long-distance tour, we do it together, strengthening our bonds with every mile. We welcome riders who share our values and are looking for a community that feels like family. Join us at Eagles Tribe MC, where the journey is just as important as the destination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}