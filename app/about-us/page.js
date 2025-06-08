import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className="bg-foreground">
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-5xl font-bold text-primary-red mb-8 text-center">About Us</h1>
            <div className="max-w-5xl mx-auto text-dark-charcoal space-y-6 text-lg leading-relaxed">
                <p>Eagles Tribe MC was born from a desire to create a true brotherhood, a haven for like-minded men who share an unwavering passion for motorcycles and the open road. Officially founded in April 2024, our club may be new, but our bonds are forged from years of riding together, navigating life’s twists and turns as a united front.</p>
                <p>We are a non-political, independent club that stands for freedom, honor, and mutual respect. Our focus is on the ride, the camaraderie, and the unwavering support we offer one another. We are not a 1% club, but a family-oriented group of men who value loyalty and integrity above all else. Our patches symbolize our commitment to this brotherhood and the principles we uphold.</p>
                <p>Our members come from all walks of life, but on the road, we are one tribe. We believe in the therapy of the wind, the thrill of the journey, and the strength of the pack. Each ride is an opportunity to strengthen our connections, create lasting memories, and reaffirm our dedication to the Eagles Tribe way of life.</p>
                <p>At Eagles Tribe MC, we are more than just a club—we are a family. We ride together, support one another, and stand by our brothers through thick and thin. If you are a dedicated rider with a heart for brotherhood and a spirit for adventure, you may find a home with us.</p>
            </div>
        </div>
    </div>
  );
}