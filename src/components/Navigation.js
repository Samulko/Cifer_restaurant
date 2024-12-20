'use client';

import { useState, useEffect, useCallback } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

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

    // Remove body scroll lock
    document.body.style.overflow = '';

    // Small delay to allow menu animation to complete
    setTimeout(() => {
      console.log(`Scrolling to section: ${sectionId}`);
      if (isTouch) {
        // Use native scroll on touch devices
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Use Lenis on desktop
        lenis.scrollTo(target, {
          duration: 1.8,
          easing: (t) => Math.min(1, 1.001 - Math.pow(5, -10 * t))
        });
      }
    }, 300);
  }, [isTouch]);

  useEffect(() => {
    // Detect touch device
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    setMounted(true);

    // Prevent body scroll when menu is open
    const updateBodyScroll = () => {
      document.body.style.overflow = isMenuOpen ? 'hidden' : '';
      if (isMenuOpen) {
        // Prevent iOS Safari bounce effect when menu is open
        document.documentElement.style.position = 'fixed';
        document.documentElement.style.width = '100%';
      } else {
        document.documentElement.style.position = '';
        document.documentElement.style.width = '';
      }
    };
    updateBodyScroll();

    // Handle escape key to close menu
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Handle touch events outside menu
    const handleTouchOutside = (e) => {
      if (isMenuOpen && e.target.closest('nav') === null) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    if (isTouch) {
      document.addEventListener('touchstart', handleTouchOutside);
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.position = '';
      document.documentElement.style.width = '';
      window.removeEventListener('keydown', handleEscape);
      if (isTouch) {
        document.removeEventListener('touchstart', handleTouchOutside);
      }
    };
  }, [isMenuOpen, isTouch]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <button 
        className="nav-menu text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? 'Close' : 'Menu'}
      </button>

      <div 
        className={`full-screen-menu ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)} // Close menu when clicking backdrop
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <nav 
          className="text-center"
          onClick={(e) => e.stopPropagation()} // Prevent menu from closing when clicking nav
        >
          <ul className="space-y-8" role="menu">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'menu', label: 'Menu' },
              { id: 'contact', label: 'Contact' }
            ].map(({ id, label }) => (
              <li key={id} role="none">
                <button
                  onClick={(e) => handleNavClick(e, id)}
                  className="nav-item text-4xl hover:opacity-70 transition-opacity text-white"
                  role="menuitem"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
