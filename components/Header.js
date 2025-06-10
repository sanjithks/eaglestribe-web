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

  // Symmetrically split links for the desktop layout
  const leftLinks = navLinks.slice(0, navLinks.length / 2);
  const rightLinks = navLinks.slice(navLinks.length / 2);

  const isActive = (path) => pathname === path;

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="relative w-full h-40 md:h-56">
      {/* Symmetrical Wavy SVG Background - This is for desktop */}
      <div className="absolute top-0 left-0 w-full h-full z-0 hidden md:block">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 60 C 400 60, 500 220, 720 220 C 940 220, 1040 60, 1440 60 V 0 H 0 Z"
            className="fill-current text-foreground/95"
          />
        </svg>
      </div>
      
      {/* Mobile background */}
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-foreground/95 md:hidden" />


      {/* --- Desktop Layout --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto hidden md:grid grid-cols-3 items-center h-full px-6">
        {/* Left Navigation */}
        <nav className="flex justify-around items-start pt-12">
          {leftLinks.map(({ name, path }) => (
            <Link key={name} href={path} className={`font-medium transition-colors duration-300 ${isActive(path) ? "text-accent font-bold" : "text-background/80 hover:text-white"}`}>
              {name}
            </Link>
          ))}
        </nav>

        {/* Center Logo */}
        <div className="flex justify-center items-center">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Eagles Tribe MC Logo"
              width={180}
              height={180}
              className="w-44 h-44 object-contain hover-scale transition-transform duration-300"
              priority
            />
          </Link>
        </div>

        {/* Right Navigation */}
        <nav className="flex justify-around items-start pt-12">
          {rightLinks.map(({ name, path }) => (
            <Link key={name} href={path} className={`font-medium transition-colors duration-300 ${isActive(path) ? "text-accent font-bold" : "text-background/80 hover:text-white"}`}>
              {name}
            </Link>
          ))}
        </nav>
      </div>


      {/* --- Mobile Layout --- */}
      <div className="relative z-10 w-full mx-auto flex md:hidden justify-between items-center h-24 px-6">
        {/* Mobile Logo */}
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
        
        {/* Mobile Hamburger Button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-background focus:outline-none" aria-label="Toggle menu">
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
        <div className="absolute top-24 left-0 w-full bg-foreground/95 md:hidden z-20">
          <nav className="flex flex-col items-center gap-2 p-4 border-t border-background/20">
            {navLinks.map(({ name, path }) => (
              <Link key={name} href={path} className={`w-full text-center py-3 rounded-md font-medium transition-colors duration-300 ${isActive(path) ? "text-foreground bg-accent" : "text-background/80 hover:bg-background/10"}`}>
                {name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}