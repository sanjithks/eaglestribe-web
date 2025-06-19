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
      document.body.style.overflow = 'auto'; // Cleanup on component unmount
    };
  }, [isMenuOpen]);

  return (
    <header className="relative w-full h-[150px] text-dark-charcoal">
      {/* ... Your Desktop Menu and top-level SVG code is unchanged ... */}
      
      {/* Mobile Layout (< 1200px) */}
      <div className="xl:hidden relative z-30 w-full flex justify-between items-center h-24 px-6">
        {/* ... Mobile Logo and Hamburger Button code is unchanged ... */}
      </div>

      {/* Mobile Slideout Menu */}
      {isMenuOpen && (
        // ✅ FIX #1: Increased z-index from z-20 to z-50
        <div className="xl:hidden absolute top-24 left-0 w-full bg-[var(--color-background)] z-50 shadow-lg border-t border-black/10">
          <nav className="flex flex-col items-center gap-1 p-4">
            {navLinks.map(({ name, path }) => (
              <Link
                key={name}
                href={path}
                className={`w-full text-center py-3 rounded-md font-body text-lg font-medium transition-colors duration-300 ${
                  isActive(path)
                    ? "text-white bg-[var(--color-primary)] font-bold"
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