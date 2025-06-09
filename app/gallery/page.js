import Image from 'next/image';

// Update this array with actual image paths from your public/images folder
const images = [
  '/images/gallery-1.jpeg',
  '/images/gallery-2.jpeg',
  '/images/gallery-3.jpeg',
  '/images/gallery-4.jpeg',
];

export default function GalleryPage() {
  return (
    <section className="bg-background text-foreground min-h-screen px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-primary mb-12 text-center">Gallery</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="bg-foreground rounded-lg shadow-lg overflow-hidden group transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                width={600}
                height={400}
                className="w-full h-72 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}