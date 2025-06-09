"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();

  return (
    <header className="bg-[#fbf3e3] sticky top-0 z-50 shadow-lg h-[132px]">
      <nav className="container mx-auto flex items-center justify-between p-4 text-dark-charcoal relative h-full">
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
        <ul className="hidden md:flex items-center space-x-6 text-lg">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/rides'
                ? pathname.startsWith('/rides')
                : pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`hover:text-primary-red transition-colors duration-300 ${
                    isActive ? 'font-bold' : ''
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#fbf3e3] backdrop-blur-sm absolute w-full">
          <ul className="flex flex-col items-center space-y-4 py-6 text-lg text-dark-charcoal">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/rides'
                  ? pathname.startsWith('/rides')
                  : pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`hover:text-primary-red transition-colors duration-300 ${
                      isActive ? 'font-bold' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}