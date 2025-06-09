"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[--color-background]/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-[--color-primary] font-[var(--font-heading)] text-2xl font-bold">
          <img src="../public/images/logo.png" alt="Eagles Tribe MC" className="h-10 w-auto" />
          Eagles Tribe MC
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-[--color-foreground]">
          {["Home", "About Us", "Rides", "Membership", "Events", "Gallery", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item === "Home" ? "" : item.toLowerCase().replace(/\s/g, "")}`}
              className="hover:text-[--color-primary] transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[--color-foreground] focus:outline-none"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden bg-[--color-background] px-4 pb-4 space-y-2">
          {["Home", "About Us", "Rides", "Membership", "Events", "Gallery", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item === "Home" ? "" : item.toLowerCase().replace(/\s/g, "")}`}
              className="block text-[--color-foreground] hover:text-[--color-primary] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}