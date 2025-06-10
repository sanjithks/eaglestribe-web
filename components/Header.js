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
        <div className="absolute top-0 left-0 w-full h-full z-0 drop-shadow-lg">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 320" // Adjusted viewBox for better spacing
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#b8860b" />
                <stop offset="50%" stopColor="#ffd700" />
                <stop offset="100%" stopColor="#b8860b" />
              </linearGradient>
            </defs>
            {/* Applying the gold gradient to all four paths */}
            <path d="M762 129C813 79 848 34 903 24H1440V-10H901C828-4 822 32 809 28L733 98Z" fill="url(#goldGradient)"/>
            <path d="M836 141C854 116 895 75 936 76H1440V47H975C941 49 904 40 873 59L776 143Z" fill="url(#goldGradient)"/>
            <path d="M696 177 640 123C607 97 580 56 535 49 465 46 394 48 0 52V80L425 75C464 77 505 68 542 84 573 101 596 129 619 150L459 148 497 179Z" fill="url(#goldGradient)"/>
            <path d="M680 229C743 234 807 210 852 165H762L661 72C541-35 594 9 1 0V35L431 33C485 36 544 24 591 56 646 102 698 152 751 201H584C612 217 645 227 678 230Z" fill="url(#goldGradient)"/>
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
            src="/images/logo.png"
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