'use client';

import { useEffect, useState } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (typeof window !== 'undefined') {
        const scrolled = window.scrollY;
        setIsVisible(scrolled > 100);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // Check initial position
    
    return () => window.removeEventListener('scroll', toggleVisibility);
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
      className={`fixed bottom-8 right-8 w-14 h-14 bg-white text-black border-2 border-black
                 rounded-full cursor-pointer hover:bg-gray-100 transition-all duration-300
                 z-[9999] flex items-center justify-center text-2xl shadow-lg
                 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

export default ScrollToTop;
