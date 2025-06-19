@/components/Header.js
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

  // Close menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    // ✅ FIX: The header is now a "container" which allows child elements
    // to respond to its size instead of the whole viewport.
    <header className="relative w-full h-24 container-type-size z-40">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        
        {/* --- Desktop Menu (Content-Aware) --- */}
        {/* This entire block will be hidden if the container is narrower than 1100px */}
        <nav className="hidden @[1100px]:flex h-full w-full items-center justify-between">
          {/* Left Links */}
          <div className="flex items-center gap-x-5"> {/* min 20px gap */}
            {leftLinks.map(({ name, path }) => (
              <Link key={name} href={path} className={`transition-colors hover:text-primary ${isActive(path) ? 'font-bold text-primary' : 'text-foreground'}`}>
                {name}
              </Link>
            ))}
          </div>

          {/* Center Logo - This creates the gap */}
          <div className="h-full w-[220px] shrink-0">
            <Link href="/" className="flex h-full items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Eagles Tribe MC Logo"
                width={100}
                height={100}
                className="object-contain"
                priority
              />
            </Link>
          </div>
          
          {/* Right Links */}
          <div className="flex items-center gap-x-5"> {/* min 20px gap */}
            {rightLinks.map(({ name, path }) => (
              <Link key={name} href={path} className={`transition-colors hover:text-primary ${isActive(path) ? 'font-bold text-primary' : 'text-foreground'}`}>
                {name}
              </Link>
            ))}
          </div>
        </nav>

        {/* --- Mobile Menu (Content-Aware) --- */}
        {/* This entire block is visible ONLY IF the container is narrower than 1100px */}
        <div className="flex w-full items-center justify-between @[1100px]:hidden">
          {/* Mobile Logo */}
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Eagles Tribe MC Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="h-8 w-8 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Slideout Menu (Logic is unchanged, but now appears based on the container query) */}
      {isMenuOpen && (
        <div className="absolute left-0 top-full w-full bg-[var(--color-background)] shadow-lg @[1100px]:hidden">
           <nav className="flex flex-col items-center gap-1 p-4">
            {navLinks.map(({ name, path }) => (
              <Link
                key={name}
                href={path}
                className={`w-full text-center py-3 rounded-md font-body text-lg font-medium transition-colors duration-300 ${
                  isActive(path)
                    ? "text-white bg-[var(--color-primary)]"
                    : "text-[var(--color-foreground)] hover:bg-black/5"
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