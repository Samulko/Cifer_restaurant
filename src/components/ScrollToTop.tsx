'use client';

import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';

const ScrollToTop = () => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: false,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Store lenis instance in window for global access
    if (typeof window !== 'undefined') {
      (window as any).lenis = lenis;
    }

    // RAF
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined' && (window as any).lenis) {
      (window as any).lenis.scrollTo(0);
    }
  };

  return (
    <button 
      onClick={scrollToTop}
      className="fixed top-8 right-8 w-12 h-12 border-2 border-white rounded-full
                flex items-center justify-center text-2xl font-bold text-white
                hover:opacity-70 transition-opacity z-[9999]"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

export default ScrollToTop;
