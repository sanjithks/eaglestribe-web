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
        {/* SVG Background Shape with Cutout */}
        <div className="absolute top-0 left-0 w-full h-28 z-0">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 112"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0 H 600 C 600 0, 580 112, 720 112 C 860 112, 840 0, 840 0 H 1440 V 112 H 0 V 0 Z"
              className="fill-current text-foreground/95"
            />
          </svg>
        </div>

        {/* Logo - Centered and positioned */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-48 h-48 z-20">
          <Link href="/" className="transition-transform duration-300 ease-in-out hover:scale-110">
            <Image
              src="/images/logo.png"
              alt="Eagles Tribe MC Logo"
              width={180}
              height={180}
              className="w-full h-full object-contain drop-shadow-xl"
              priority
            />
          </Link>
        </div>

        {/* Menu Links - Positioned on top of the SVG */}
        <div className="absolute top-0 left-0 w-full h-28 z-10">
          <div className="w-full max-w-7xl h-full mx-auto grid grid-cols-[1fr_240px_1fr] items-center px-6">
            {/* Left Navigation */}
            <nav className="flex justify-around items-center">
              {leftLinks.map(({ name, path }) => (
                <Link
                  key={name}
                  href={path}
                  className={`font-body font-semibold text-lg transition-all duration-300 ${
                    isActive(path)
                      ? "text-accent scale-110"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {name}
                </Link>
              ))}
            </nav>

            {/* Empty space for the logo */}
            <div></div>

            {/* Right Navigation */}
            <nav className="flex justify-around items-center">
              {rightLinks.map(({ name, path }) => (
                <Link
                  key={name}
                  href={path}
                  className={`font-body font-semibold text-lg transition-all duration-300 ${
                    isActive(path)
                      ? "text-accent scale-110"
                      : "text-white/70 hover:text-white"
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