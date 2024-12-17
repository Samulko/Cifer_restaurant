'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button 
        className="nav-menu text-white"
        onClick={toggleMenu}
      >
        {isMenuOpen ? 'Close' : 'Menu'}
      </button>

      <div className={`full-screen-menu ${isMenuOpen ? 'active' : ''}`}>
        <nav className="text-center">
          <ul className="space-y-8">
            <li>
              <Link href="/" className="text-4xl hover:opacity-70 transition-opacity">
                Home
              </Link>
            </li>
            <li>
              <Link href="/menu" className="text-4xl hover:opacity-70 transition-opacity">
                Our Menu
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-4xl hover:opacity-70 transition-opacity">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-4xl hover:opacity-70 transition-opacity">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
