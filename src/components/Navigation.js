import { useState, useCallback } from 'react';
import Link from 'next/link';
import { translations as en } from '../../public/locales/en';
import { translations as sk } from '../../public/locales/sk';
import styles from '../../styles/modules/navigation.module.css';

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
        className={styles.navMenu}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="text-white">MENU</span>
      </button>

      <div className={`${styles.fullScreenMenu} ${isMenuOpen ? styles.active : ''}`}>
        <div className={styles.menuContent}>
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
