import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <section className="bg-background text-foreground min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-primary text-center mb-12">
          About Us
        </h1>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong className="text-primary">Eagles Tribe MC</strong> was born from a desire to create a true brotherhood — a haven for like-minded men who share an unwavering passion for motorcycles and the open road. Officially founded in April 2024, our club may be new, but our bonds are forged from years of riding together, navigating life’s twists and turns as a united front.
            </p>
            <p>
              We are a non-political, independent club that stands for freedom, honor, and mutual respect. We are not a 1% club, but a family-oriented group of men who value loyalty and integrity above all else. Our patches symbolize our commitment to this brotherhood and the principles we uphold.
            </p>
            <p>
              Our members come from all walks of life, but on the road, we are one tribe. We believe in the therapy of the wind, the thrill of the journey, and the strength of the pack. Each ride is an opportunity to strengthen our connections, create lasting memories, and reaffirm our dedication to the Eagles Tribe way of life.
            </p>
            <p>
              At Eagles Tribe MC, we are more than just a club — we are a family. We ride together, support one another, and stand by our brothers through thick and thin. If you are a dedicated rider with a heart for brotherhood and a spirit for adventure, you may find a home with us.
            </p>
          </div>

          <div className="hidden md:block">
            <Image
              src="/logo.png"
              alt="Eagles Tribe MC Logo"
              width={500}
              height={500}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}