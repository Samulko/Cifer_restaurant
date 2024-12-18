'use client';

import { useEffect, useState } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (typeof window !== 'undefined') {
        const scrolled = document.documentElement.scrollTop;
        setIsVisible(scrolled > 50);
      }
    };

    const handleScroll = () => {
      requestAnimationFrame(toggleVisibility);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    toggleVisibility(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined' && window.lenis) {
      window.lenis.scrollTo(0, {
        duration: 1.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
  };

  return (
    <button 
      onClick={scrollToTop}
      className={`scroll-to-top w-14 h-14 bg-white text-black border-2 border-black
                 rounded-full cursor-pointer hover:bg-gray-100 transition-all duration-300
                 flex items-center justify-center text-3xl font-bold shadow-2xl
                 ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

export default ScrollToTop;
