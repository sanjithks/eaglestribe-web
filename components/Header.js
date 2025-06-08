// STEP 1: Add this directive to make the component interactive.
"use client";

// STEP 2: Import the 'useState' hook from React.
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
  // STEP 3: Create a state variable to track if the mobile menu is open.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-dark-charcoal sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto flex items-center justify-between p-4 text-foreground relative">
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
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="hover:text-primary-red transition-colors duration-300">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {/* STEP 4: Add an onClick event to toggle the menu state. */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>
      </nav>

      {/* STEP 5: The Mobile Menu itself. It only appears if 'isMenuOpen' is true. */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-charcoal/95 backdrop-blur-sm absolute w-full">
          <ul className="flex flex-col items-center space-y-4 py-6 text-lg">
            {navLinks.map((link) => (
              <li key={link.name}>
                {/* When a link is clicked, we also close the menu */}
                <Link 
                  href={link.href} 
                  className="hover:text-primary-red transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
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