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
    <header className="bg-[#fbf3e3] sticky top-0 z-50 shadow-lg h-[132px]">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4 text-dark-charcoal h-full">
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

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-10 text-lg">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="hover:text-primary-red transition-colors duration-300">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger Menu Button for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="focus:outline-none"
          >
            <svg className="w-8 h-8 text-dark-charcoal" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 5h14a1 1 0 100-2H3a1 1 0 000 2zm14 4H3a1 1 0 100 2h14a1 1 0 100-2zm0 6H3a1 1 0 100 2h14a1 1 0 100-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#fbf3e3]/95 backdrop-blur-md w-full absolute top-[132px] left-0 z-40 shadow-inner transition">
          <ul className="flex flex-col items-center space-y-6 py-6 text-lg">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-primary-red transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}