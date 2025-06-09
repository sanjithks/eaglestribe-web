'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Rides', href: '/rides' },
  { label: 'Membership', href: '/membership' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === '/rides') {
      return pathname.startsWith('/rides');
    }
    return pathname === href;
  };

  return (
    <header className="bg-background border-b border-gray-300 sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Eagles Tribe MC Logo"
            width={120}
            height={60}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium">
          {menuItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors hover:text-primary ${
                isActive(href) ? 'font-bold text-primary' : 'text-dark-charcoal'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-dark-charcoal focus:outline-none"
          aria-label="Toggle Menu"
        >
          {/* Hamburger icon with nice spacing */}
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-dark-charcoal"></span>
            <span className="block w-6 h-0.5 bg-dark-charcoal"></span>
            <span className="block w-6 h-0.5 bg-dark-charcoal"></span>
          </div>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background shadow-md border-t border-gray-200 py-4 px-6 space-y-4 text-lg">
          {menuItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`block transition-colors hover:text-primary ${
                isActive(href) ? 'font-bold text-primary' : 'text-dark-charcoal'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}