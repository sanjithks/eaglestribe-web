"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const navLinks = [
    { name: "About Us", path: "/about-us" },
    { name: "Rides", path: "/rides" },
    { name: "Membership", path: "/membership" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  // Symmetrically split the links for the two sides of the logo
  const leftLinks = navLinks.slice(0, navLinks.length / 2);
  const rightLinks = navLinks.slice(navLinks.length / 2);

  const isActive = (path) => pathname === path;

  return (
    <header className="relative w-full h-48 flex items-center justify-center">
      {/* Symmetrical Wavy SVG Background with a Peak */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 60 C 250 60, 400 120, 720 120 C 1040 120, 1190 60, 1440 60 V 0 H 0 Z"
            className="fill-current text-foreground/95"
          />
        </svg>
      </div>

      {/* Grid Layout for Nav and Logo */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-3 items-center h-full px-6">
        {/* Left Navigation */}
        <nav className="flex justify-around items-center">
          {leftLinks.map(({ name, path }) => (
            <Link
              key={name}
              href={path}
              className={`font-medium transition-colors duration-300 ${
                isActive(path)
                  ? "text-accent font-bold"
                  : "text-background/80 hover:text-white"
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* Center Logo - Positioned higher up, to be covered by the wave */}
        <div className="flex justify-center items-start h-full pt-4">
          <Link href="/">
            <Image
              src="/images/logo.png" // Make sure you have your logo in the /public/images/ folder
              alt="Eagles Tribe MC Logo"
              width={100}
              height={100}
              className="w-28 h-28 object-contain hover-scale transition-transform duration-300"
              priority
            />
          </Link>
        </div>

        {/* Right Navigation */}
        <nav className="flex justify-around items-center">
          {rightLinks.map(({ name, path }) => (
            <Link
              key={name}
              href={path}
              className={`font-medium transition-colors duration-300 ${
                isActive(path)
                  ? "text-accent font-bold"
                  : "text-background/80 hover:text-white"
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}