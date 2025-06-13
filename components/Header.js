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
    <header className="relative w-full h-[120px] text-dark-charcoal overflow-visible">
      {/* Floating large logo (desktop only) */}
      <div className="absolute top-0 left-6 z-30 hidden md:block">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Eagles Tribe MC Logo"
            width={300}
            height={300}
            className="object-contain drop-shadow-lg"
            priority
          />
        </Link>
      </div>

      {/* Shared SVG background */}
      <div className="absolute top-5 left-0 w-full h-[450px] z-0 overflow-hidden">
        <div className="absolute inset-0 flex justify-center">
          <svg
            className="w-[4000px] h-[450px] shrink-0"
            viewBox="0 0 4000 800"
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
            <path d="M2045 113C2110 41 2102 39 2198 30H4052V0H2195C2084 11 2084 20 2023 89Z" fill="url(#goldGradient)" />
            <path d="M2101 122C2137 78 2141 78 2200 78H4052V48H2198C2123 51 2123 51 2059 123Z" fill="url(#goldGradient)" />
            <path d="M1979 143C1922 62 1901 50 1804 48H0V78H1805C1859 77 1873 74 1921 116H1790L1819 144Z" fill="url(#goldGradient)" />
            <path d="M1894 164C1997 239 2078 173 2131 140H2044C1964 41 1973 0 1835 0H0V30H1835C1937 35 1939 47 2017 162Z" fill="url(#goldGradient)" />
          </svg>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex absolute top-[40px] w-full justify-between items-center px-8 max-w-6xl mx-auto z-10">
        <nav className="flex items-center gap-8 pl-[200px]">
          {leftLinks.map(({ name, path }) => (
            <Link
              key={name}
              href={path}
              className={`font-body text-lg font-light transition-all duration-300 ${
                isActive(path)
                  ? "text-white font-bold scale-110 drop-shadow-md"
                  : "text-white/80 hover:text-white hover:scale-105"
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>
        <nav className="flex items-center gap-8 pr-[100px]">
          {rightLinks.map(({ name, path }) => (
            <Link
              key={name}
              href={path}
              className={`font-body text-lg font-light transition-all duration-300 ${
                isActive(path)
                  ? "text-white font-bold scale-110 drop-shadow-md"
                  : "text-white/80 hover:text-white hover:scale-105"
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden relative z-30 w-full flex justify-between items-center h-24 px-6">
        <div className="absolute inset-0 -top-[60px] z-0">
          <svg
            className="w-[4000px] h-[450px] shrink-0"
            viewBox="0 0 4000 800"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="goldGradientMobile" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#b8860b" />
                <stop offset="50%" stopColor="#ffd700" />
                <stop offset="100%" stopColor="#b8860b" />
              </linearGradient>
            </defs>
            <path d="M2045 113C2110 41 2102 39 2198 30H4052V0H2195C2084 11 2084 20 2023 89Z" fill="url(#goldGradientMobile)" />
            <path d="M2101 122C2137 78 2141 78 2200 78H4052V48H2198C2123 51 2123 51 2059 123Z" fill="url(#goldGradientMobile)" />
            <path d="M1979 143C1922 62 1901 50 1804 48H0V78H1805C1859 77 1873 74 1921 116H1790L1819 144Z" fill="url(#goldGradientMobile)" />
            <path d="M1894 164C1997 239 2078 173 2131 140H2044C1964 41 1973 0 1835 0H0V30H1835C1937 35 1939 47 2017 162Z" fill="url(#goldGradientMobile)" />
          </svg>
        </div>

        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Eagles Tribe MC Logo"
            width={80}
            height={80}
            className="w-20 h-20 object-contain relative z-10"
            priority
          />
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-dark-charcoal relative z-10 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-24 left-0 w-full bg-foreground z-20 shadow-lg border-t">
          <nav className="flex flex-col items-center gap-1 p-4">
            {navLinks.map(({ name, path }) => (
              <Link
                key={name}
                href={path}
                className={`w-full text-center py-3 rounded-md font-body text-lg font-light transition-colors duration-300 ${
                  isActive(path)
                    ? "text-white bg-primary-red font-bold"
                    : "text-dark-charcoal hover:bg-black/5"
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