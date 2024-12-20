'use client';

import { useState, useEffect, useCallback } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleNavClick = useCallback((e, sectionId) => {
    e.preventDefault();
    
    const lenis = window.lenis;
    if (!lenis) {
      console.log('Lenis not found');
      return;
    }

    const target = document.getElementById(sectionId);
    if (!target) {
      console.log(`Target section ${sectionId} not found`);
      return;
    }

    // Close menu first
    setIsMenuOpen(false);

    // Small delay to allow menu animation to complete
    setTimeout(() => {
      console.log(`Scrolling to section: ${sectionId}`);
      lenis.scrollTo(target, {
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(5, -10 * t)),
        offset: 0 // Ensure we scroll to the top of the section
      });
    }, 300);
  }, []);

  useEffect(() => {
    setMounted(true);

    // Prevent body scroll when menu is open
    const updateBodyScroll = () => {
      document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    };
    updateBodyScroll();

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <button 
        className="nav-menu text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMenuOpen ? 'Close' : 'Menu'}
      </button>

      <div 
        className={`full-screen-menu ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)} // Close menu when clicking backdrop
      >
        <nav 
          className="text-center"
          onClick={(e) => e.stopPropagation()} // Prevent menu from closing when clicking nav
        >
          <ul className="space-y-8">
            <li>
              <button
                onClick={(e) => handleNavClick(e, 'home')}
                className="nav-item text-4xl hover:opacity-70 transition-opacity text-white"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleNavClick(e, 'about')}
                className="nav-item text-4xl hover:opacity-70 transition-opacity text-white"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleNavClick(e, 'events')}
                className="nav-item text-4xl hover:opacity-70 transition-opacity text-white"
              >
                Events
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleNavClick(e, 'contact')}
                className="nav-item text-4xl hover:opacity-70 transition-opacity text-white"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
