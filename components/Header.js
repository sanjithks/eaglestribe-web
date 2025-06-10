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
          viewBox="0 0 1440 240" // Increased viewBox height for circular shape
          preserveAspectRatio="xMidYMid meet" // Ensures aspect ratio is met
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="handlebarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#282828" />
              <stop offset="100%" stopColor="#1a1a1a" />
            </linearGradient>
             <radialGradient id="headlightGradient">
              <stop offset="20%" stopColor="oklch(90% 0.12 120)" />
              <stop offset="100%" stopColor="var(--color-secondary)" />
            </radialGradient>
          </defs>

          {/* Handlebars */}
          <path
            d="M0 100 H 500 C 550 100, 570 50, 600 50 H 840 C 870 50, 890 100, 940 100 H 1440 V 0 H 0 Z"
            fill="url(#handlebarGradient)"
          />
          {/* Headlight Casing */}
          <circle cx="720" cy="120" r="120" fill="url(#handlebarGradient)" />
           {/* Headlight Glass */}
          <circle cx="720" cy="120" r="100" fill="url(#headlightGradient)" stroke="#ffffff" strokeOpacity="0.5" />
        </svg>
      </div>

       {/* Mobile background */}
      <div className="absolute top-0 left-0 w-full h-24 z-0 bg-foreground/95 md:hidden" />


      {/* --- Desktop Layout --- */}
      <div className="relative z-10 w-full max-w-7xl h-full mx-auto hidden md:grid grid-cols-[1fr_auto_1fr] items-start pt-6 px-6">
        {/* Left Navigation */}
        <nav className="flex justify-around items-center h-20">
          {leftLinks.map(({ name, path }) => (
            <Link key={name} href={path} className={`font-body font-semibold text-lg transition-all duration-300 ${isActive(path) ? "text-white scale-110" : "text-white/70 hover:text-white"}`}>
              {name}
            </Link>
          ))}
        </nav>

        {/* Center Logo */}
        <div className="flex justify-center items-center h-full">
          <Link href="/" className="hover-scale z-20">
            <Image
              src="/images/logo.png"
              alt="Eagles Tribe MC Logo"
              width={180}
              height={180}
              className="w-48 h-48 object-contain drop-shadow-xl"
              priority
            />
          </Link>
        </div>

        {/* Right Navigation */}
        <nav className="flex justify-around items-center h-20">
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
        <div className="absolute top-24 left-0 w-full bg-foreground/95 md:hidden z-20 shadow-lg">
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