'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us' },
  { label: 'Rides', path: '/rides' },
  { label: 'Membership', path: '/membership' },
  { label: 'Events', path: '/events' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-foreground/80 backdrop-blur-md shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Logo" width={48} height={48} />
          <span className="text-xl font-bold text-primary hidden sm:inline">Eagles Tribe MC</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-7 h-7" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M3 5h14M3 10h14M3 15h14"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-lg font-medium">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`transition-colors ${
                isActive(item.path) ? 'font-bold text-primary' : 'text-dark-charcoal hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && isMobile && (
        <div className="md:hidden bg-foreground/90 backdrop-blur-md shadow-md px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block text-lg ${
                isActive(item.path) ? 'font-bold text-primary' : 'text-dark-charcoal hover:text-primary'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}