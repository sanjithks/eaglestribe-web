"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Rides", path: "/rides", activeMatch: (path) => path.startsWith("/rides") },
    { name: "Membership", path: "/membership" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path, customMatch) =>
    customMatch ? customMatch(pathname) : pathname === path;

  return (
    <header className="backdrop-blur-sm bg-foreground/80 shadow-md border-b border-gray-300 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Eagles Tribe MC"
            width={50}
            height={50}
            className="w-auto h-12"
            priority
          />
          <span className="ml-3 text-xl font-bold text-primary hidden sm:inline">
            Eagles Tribe MC
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map(({ name, path, activeMatch }) => (
            <Link
              key={name}
              href={path}
              className={`text-dark-charcoal hover:text-primary transition-colors duration-200 font-medium ${
                isActive(path, activeMatch) ? "font-bold text-primary" : ""
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-dark-charcoal focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && isMobile && (
        <div className="md:hidden bg-foreground/95 border-t border-gray-200 px-4 pb-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map(({ name, path, activeMatch }) => (
              <Link
                key={name}
                href={path}
                onClick={() => setMenuOpen(false)}
                className={`text-dark-charcoal hover:text-primary font-medium transition ${
                  isActive(path, activeMatch) ? "font-bold text-primary" : ""
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