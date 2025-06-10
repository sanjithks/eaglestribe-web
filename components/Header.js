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

  // Split the links for the two sides of the logo
  const leftLinks = navLinks.slice(0, 3);
  const rightLinks = navLinks.slice(3);

  const isActive = (path) => pathname === path;

  return (
    <header className="relative w-full h-48 flex items-center justify-center">
      {/* Wavy SVG Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 190"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 118L53.625 113.167C107.25 108.333 214.5 98.6667 321.75 103.833C429 109 536.25 129 643.5 139C750.75 149 858 149 965.25 134.167C1072.5 119.333 1179.75 89.6667 1287 74.8333C1394.25 60 1440 60 1440 60V0H0V118Z"
            className="fill-current text-foreground/90"
          />
        </svg>
      </div>

      {/* Grid Layout for Nav and Logo */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-3 items-center px-6">
        {/* Left Navigation */}
        <nav className="flex justify-around">
          {leftLinks.map(({ name, path }) => (
            <Link
              key={name}
              href={path}
              className={`font-medium text-background transition-colors duration-300 hover:text-accent ${
                isActive(path) ? "font-bold text-accent" : ""
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* Center Logo */}
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Eagles Tribe MC Logo"
              width={160}
              height={160}
              className="w-40 h-40 object-contain hover-scale"
            />
          </Link>
        </div>

        {/* Right Navigation */}
        <nav className="flex justify-around">
          {rightLinks.map(({ name, path }) => (
            <Link
              key={name}
              href={path}
              className={`font-medium text-background transition-colors duration-300 hover:text-accent ${
                isActive(path) ? "font-bold text-accent" : ""
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