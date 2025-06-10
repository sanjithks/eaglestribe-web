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
    <header className="relative w-full h-48 flex items-start pt-8">
      {/* Symmetrical Wavy SVG Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 190"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 80 C 150 80, 250 130, 450 130 C 650 130, 650 40, 720 40 C 790 40, 790 130, 990 130 C 1190 130, 1290 80, 1440 80 V 0 H 0 Z"
            className="fill-current text-foreground/95"
          />
        </svg>
      </div>

      {/* Grid Layout for Nav and Logo */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-3 items-center px-6">
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

        {/* Center Logo - Positioned to sit in the dip */}
        <div className="relative flex justify-center items-center h-40">
           <Link href="/" className="absolute -top-12">
            <Image
              src="/images/logo.png"
              alt="Eagles Tribe MC Logo"
              width={160}
              height={160}
              className="w-40 h-40 object-contain hover-scale transition-transform duration-300"
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