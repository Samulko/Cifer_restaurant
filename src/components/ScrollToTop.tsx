'use client';

import { useEffect, useState } from 'react';

const ScrollToTop = () => {
  const scrollToTop = () => {
    const scrollContainer = document.querySelector('main');
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'auto'
      });
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
