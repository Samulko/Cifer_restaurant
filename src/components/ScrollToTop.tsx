'use client';

import { useEffect, useState } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
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
      className={`fixed top-8 right-8 w-10 h-10 bg-white text-black border-none 
                 rounded-full cursor-pointer hover:bg-gray-200 transition-all 
                 z-[60] flex items-center justify-center text-xl shadow-lg
                 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

export default ScrollToTop;
