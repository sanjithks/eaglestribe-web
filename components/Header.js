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
              <path d="M1382 75C1425 27 1420 26 1484 19H2720V0H1482C1408 7 1408 13 1367 59Z" fill="url(#goldGradient)" />
              <path d="M1419 81C1443 52 1446 52 1485 50H2720V30H1484C1434 34 1434 34 1391 82Z" fill="url(#goldGradient)" />
              <path d="M1338 95C1300 41 1286 33 1221 32H1V50H1222C1258 51 1267 49 1299 77H1212L1231 96Z" fill="url(#goldGradient)" />
              <path d="M1281 109C1350 159 1404 115 1439 93H1381C1328 27 1334 0 1242 0H1V20H1242C1310 23 1311 31 1363 108Z" fill="url(#goldGradient)" />
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