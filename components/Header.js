"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Rides', href: '/rides' },
  { name: 'Membership', href: '/membership' },
  { name: 'Events', href: '/events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-dark-charcoal sticky top-0 z-50 shadow-lg h-[132px]">
      <nav className="container mx-auto flex items-center justify-between p-4 text-foreground relative h-full">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Eagles Tribe MC Logo"
            width={100}
            height={100}
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center space-x-10 text-lg">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="hover:text-primary-red transition-colors duration-300"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="focus:outline-none"
          >
            {/* Classic hamburger icon */}
            <svg className="w-8 h-8 text-foreground" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 5h14a1 1 0 100-2H3a1 1 0 000 2zm14 4H3a1 1 0 100 2h14a1 1 0 100-2zm0 6H3a1 1 0 100 2h14a1 1 0 100-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out transform ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        } bg-[#fbf3e3]/95 backdrop-blur-md py-6 text-lg flex flex-col items-center space-y-4 z-40`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="hover:text-primary-red transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
}