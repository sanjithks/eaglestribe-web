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
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="relative w-full h-32 md:h-48">
      {/* --- Desktop Layout --- */}
      <div className="relative w-full h-full hidden md:block">
        {/* SVG background with center cropping */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1440px] h-full z-0 overflow-hidden drop-shadow-lg">
          <div className="w-full h-full mx-auto relative">
            <svg
              className="absolute top-0 left-0 w-full h-full"
              viewBox="0 0 1440 320"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#b8860b" />
                  <stop offset="50%" stopColor="#ffd700" />
                  <stop offset="100%" stopColor="#b8860b" />
                </linearGradient>
              </defs>
              <path d="M2045 113C2110 41 2102 39 2198 30H4052V0H2195C2084 11 2084 20 2023 89Z" fill="url(#goldGradient)" />
              <path d="M2101 122C2137 78 2141 78 2200 78H4052V48H2198C2123 51 2123 51 2059 123Z" fill="url(#goldGradient)" />
              <path d="M1979 143C1922 62 1901 50 1804 48H0V78H1805C1859 77 1873 74 1921 116H1790L1819 144Z" fill="url(#goldGradient)" />
              <path d="M1894 164C1997 239 2078 173 2131 140H2044C1964 41 1973 0 1835 0H0V30H1835C1937 35 1939 47 2017 162Z" fill="url(#goldGradient)" />
            </svg>
          </div>
        </div>

        {/* Nav Links */}
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <div className="w-full max-w-7xl h-full mx-auto grid grid-cols-[1fr_1fr] items-center px-24">
            {/* Left Links */}
            <nav className="flex flex-col items-start gap-3">
              {leftLinks.map(({ name, path }, index) => (
                <Link
                  key={name}
                  href={path}
                  style={{ transform: `translateX(${index * 40}px)` }}
                  className={`font-body font-semibold text-lg transition-all duration-300 ${
                    isActive(path)
                      ? "text-white scale-110 font-bold"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {name}
                </Link>
              ))}
            </nav>
            {/* Right Links */}
            <nav className="flex flex-col items-end gap-3">
              {rightLinks.map(({ name, path }, index) => (
                <Link
                  key={name}
                  href={path}
                  style={{ transform: `translateX(-${index * 40}px)` }}
                  className={`font-body font-semibold text-lg transition-all duration-300 ${
                    isActive(path)
                      ? "text-white scale-110 font-bold"
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

      {/* --- Mobile Menu Panel --- */}
      {isMenuOpen && (
        <div className="absolute top-24 left-0 w-full bg-foreground/95 md:hidden z-20 shadow-lg">
          <nav className="flex flex-col items-center gap-2 p-4 border-t border-white/20">
            {navLinks.map(({ name, path }) => (
              <Link
                key={name}
                href={path}
                className={`w-full text-center py-3 rounded-md font-body font-medium transition-colors duration-300 ${
                  isActive(path)
                    ? "text-primary bg-white font-bold"
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