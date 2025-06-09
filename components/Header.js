'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Rides', href: '/rides' },
  { label: 'Membership', href: '/membership' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    if (href === '/rides') return pathname.startsWith('/rides');
    return pathname === href;
  };

  return (
    <header className="bg-foreground text-dark-charcoal shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/logo.png" alt="Eagles Tribe MC" width={50} height={50} />
          <span className="text-xl font-bold text-primary">Eagles Tribe MC</span>
        </Link>

        {/* Hamburger (Mobile Only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-dark-charcoal focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Horizontal Menu (Desktop) */}
        <nav className="hidden md:flex space-x-6 items-center text-lg font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-primary transition ${
                isActive(item.href) ? 'font-bold text-primary' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <nav className="md:hidden bg-foreground border-t border-gray-200 shadow-inner">
          <div className="flex flex-col px-6 py-4 space-y-3 text-lg font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-primary transition ${
                  isActive(item.href) ? 'font-bold text-primary' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}