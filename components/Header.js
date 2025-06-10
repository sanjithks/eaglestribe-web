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
    <header className="relative w-full h-48 md:h-64">
      {/* Glossy SVG Background - Desktop */}
      <div className="absolute top-0 left-0 w-full h-full z-0 hidden md:block">
        <svg
          className="w-full h-full drop-shadow-lg"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main shape with gradient */}
          <path
            d="M0 80 H 450 C 550 80, 620 20, 720 20 C 820 20, 890 80, 990 80 H 1440 V 0 H 0 Z"
            fill="url(#headerGradient)"
          />
          {/* Subtle top highlight for glassy effect */}
          <path
            d="M0 80 H 450 C 550 80, 620 20, 720 20 C 820 20, 890 80, 990 80 H 1440"
            fill="none"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="headerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="oklch(40% 0.23 25)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Mobile background */}
      <div className="absolute top-0 left-0 w-full h-24 z-0 bg-primary md:hidden" />

      {/* --- Desktop Layout --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto hidden md:grid grid-cols-3 items-center h-48 px-6">
        {/* Left Navigation */}
        <nav className="flex justify-around items-center h-full pt-4">
          {leftLinks.map(({ name, path }) => (
            <Link key={name} href={path} className={`font-body font-semibold text-lg transition-all duration-300 ${isActive(path) ? "text-white scale-110" : "text-white/70 hover:text-white"}`}>
              {name}
            </Link>
          ))}
        </nav>

        {/* Center Logo */}
        <div className="flex justify-center items-start h-full">
          <Link href="/" className="hover-scale">
            <Image
              src="/images/logo.png"
              alt="Eagles Tribe MC Logo"
              width={180}
              height={180}
              className="w-44 h-44 object-contain drop-shadow-xl"
              priority
            />
          </Link>
        </div>

        {/* Right Navigation */}
        <nav className="flex justify-around items-center h-full pt-4">
          {rightLinks.map(({ name, path }) => (
            <Link key={name} href={path} className={`font-body font-semibold text-lg transition-all duration-300 ${isActive(path) ? "text-white scale-110" : "text-white/70 hover:text-white"}`}>
              {name}
            </Link>
          ))}
        </nav>
      </div>

      {/* --- Mobile Layout --- */}
      <div className="relative z-10 w-full mx-auto flex md:hidden justify-between items-center h-24 px-6">
        <Link href="/">
          <Image src="/images/logo.png" alt="Eagles Tribe MC Logo" width={64} height={64} className="w-16 h-16 object-contain" priority />
        </Link>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none" aria-label="Toggle menu">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="absolute top-24 left-0 w-full bg-primary md:hidden z-20 shadow-lg">
          <nav className="flex flex-col items-center gap-2 p-4 border-t border-white/20">
            {navLinks.map(({ name, path }) => (
              <Link key={name} href={path} className={`w-full text-center py-3 rounded-md font-body font-medium transition-colors duration-300 ${isActive(path) ? "text-primary bg-white" : "text-white/80 hover:bg-white/10"}`}>
                {name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}