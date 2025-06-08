import Image from 'next/image';

// Update this array to use your new local image paths
const images = [
  '/images/gallery-1.jpeg',
  '/images/gallery-2.jpeg',
  '/images/gallery-3.jpeg',
  '/images/gallery-4.jpeg',
];

export default function GalleryPage() {
    return (
        <div className="bg-background">
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-5xl font-bold text-primary-red mb-12 text-center">Gallery</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((src, index) => (
                        <div key={index} className="bg-foreground p-2 rounded-lg shadow-md overflow-hidden group">
                            <Image
                                src={src} // <-- PATH IS NOW FROM THE ARRAY
                                alt={`Gallery image ${index + 1}`}
                                width={400}
                                height={400}
                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}