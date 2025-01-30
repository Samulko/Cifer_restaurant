import { useState, useCallback } from 'react';
import Link from 'next/link';
import { translations as en } from '../../public/locales/en';
import { translations as sk } from '../../public/locales/sk';

export default function Navigation({ currentLanguage, onLanguageChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const handleReservationClick = () => {
    if (window.lenis) {
      window.lenis.scrollTo('#reservation', {
        duration: 1.5
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Menu Button */}
      <button
        className="nav-menu"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="text-white">MENU</span>
      </button>

      {/* Full Screen Menu */}
      <div className={`full-screen-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="flex flex-col items-center space-y-8">
          <Link href="#home" onClick={toggleMenu}>
            <button>
              {currentLanguage === 'en' ? en.navigation.home : sk.navigation.home}
            </button>
          </Link>
          <Link href="#about" onClick={toggleMenu}>
            <button>
              {currentLanguage === 'en' ? en.navigation.about : sk.navigation.about}
            </button>
          </Link>
          <Link href="#menu" onClick={toggleMenu}>
            <button>
              {currentLanguage === 'en' ? en.navigation.menu : sk.navigation.menu}
            </button>
          </Link>
          <Link href="#contact" onClick={toggleMenu}>
            <button>
              {currentLanguage === 'en' ? en.navigation.contact : sk.navigation.contact}
            </button>
          </Link>
          <button onClick={handleReservationClick}>
            Reservation
          </button>
        </div>
      </div>
    </>
  );
}
