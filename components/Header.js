"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "About Us", path: "/about-us" },
    { name: "Rides", path: "/rides" },
    { name: "Membership", path: "/membership" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const leftLinks = navLinks.slice(0, 3);
  const rightLinks = navLinks.slice(3);

  const isActive = (path) => pathname === path;

  useEffect(() => {
    // Close mobile menu on route change
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="relative w-full h-32 md:h-48">
      {/* --- Desktop Layout Container --- */}
      <div className="relative w-full h-full hidden md:block">
        {/* SVG Background Shape */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 192"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#b8860b" />
                <stop offset="50%" stopColor="#ffd700" />
                <stop offset="100%" stopColor="#b8860b" />
              </linearGradient>
            </defs>
            {/* Top bar */}
            <path d="M 677.918 968.137 C 644.7894 965.673 612.194 955.656 583.4804 938.9636 H 749.9854 C 696.895 890.2926 645.1644 839.84 589.789 793.8432 C 542.576 761.5676 483.438 773.6106 429.9016 771.0322 L 0 773 L 0 738 C 592.916 747.0404 548 691 659.4696 810.2172 L 760.2116 902.9176 H 849.886 C 805.183 947.5822 741.1004 972.0946 677.9184 967.176 Z" fill="url(#goldGradient)" />
            {/* Middle bar */}
            <path d="M 497 917 L 459 886 L 619 888 C 596.3648 867.292 573.0948 839.4496 542.2518 822.3594 C 505.4458 806.7144 464.2738 815.574 425.4048 813.244 L 0 818 L 0 790 C 393.9954 786.1914 464.878 783.586 535.444 787.018 C 580.603 794.0184 607.1736 834.864 640.682 861.461 L 697 915 Z" fill="url(#goldGradient)" />
            {/* second bar */}
            <path d="M 775.7004 881.285 L 873 797 C 903.5514 778.5308 940.4928 786.6544 975.1328 784.747 H 1440 L 1440 814 H 936 C 895 813 853.9288 854.366 836 879 Z" fill="url(#goldGradient)" fillOpacity="0.8" />
            {/* Third bar */}
            <path d="M 733 836 L 809 766 C 821.5242 769.938 828 734 901 728 H 1440 L 1440 762 H 902.9152 C 848.2276 771.5028 812.9362 817.2544 761.5242 866.9378 Z" fill="url(#goldGradient)" fillOpacity="0.6" />
          </svg>
        </div>

        {/* Menu Links - Positioned on top of the SVG */}
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <div className="w-full max-w-7xl h-full mx-auto grid grid-cols-[1fr_1fr] items-center px-24">
            {/* Left Navigation */}
            <nav className="flex flex-col items-start gap-3">
              {leftLinks.map(({ name, path }, index) => (
                <Link
                  key={name}
                  href={path}
                  style={{ transform: `translateX(${index * 40}px)` }}
                  className={`font-body font-semibold text-lg transition-all duration-300 ${
                    isActive(path)
                      ? "text-white scale-110"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {name}
                </Link>
              ))}
            </nav>

            {/* Right Navigation */}
            <nav className="flex flex-col items-end gap-3">
              {rightLinks.map(({ name, path }, index) => (
                <Link
                  key={name}
                  href={path}
                  style={{ transform: `translateX(-${index * 40}px)` }}
                  className={`font-body font-semibold text-lg transition-all duration-300 ${
                    isActive(path)
                      ? "text-white scale-110"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* --- Mobile Layout --- */}
      <div className="relative z-10 w-full mx-auto flex md:hidden justify-between items-center h-24 px-6 bg-foreground/95">
        <Link href="/">
          <Image
            src="/images/logo.png" // Assuming you might want a logo on mobile
            alt="Eagles Tribe MC Logo"
            width={64}
            height={64}
            className="w-16 h-16 object-contain"
            priority
          />
        </Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="absolute top-24 left-0 w-full bg-foreground/95 md:hidden z-20 shadow-lg">
          <nav className="flex flex-col items-center gap-2 p-4 border-t border-white/20">
            {navLinks.map(({ name, path }) => (
              <Link
                key={name}
                href={path}
                className={`w-full text-center py-3 rounded-md font-body font-medium transition-colors duration-300 ${
                  isActive(path)
                    ? "text-primary bg-white"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}