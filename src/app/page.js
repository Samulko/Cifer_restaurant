'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ImageScroll = dynamic(() => import('../components/ImageScroll'), {
  ssr: false
});

const SmoothScroll = dynamic(() => import('../components/SmoothScroll'), {
  ssr: false
});

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black">
      <SmoothScroll>
        <ImageScroll />
      </SmoothScroll>
      <button 
        id="scrollToTop" 
        onClick={() => {
          const scrollContainer = document.querySelector('.smooth-scroll-wrapper');
          if (scrollContainer) {
            scrollContainer.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }
        }} 
        className="fixed top-8 right-8 w-10 h-10 bg-white text-black border-none rounded-full cursor-pointer hover:bg-gray-200 transition-colors z-[60] flex items-center justify-center text-xl shadow-lg"
      >
        ↑
      </button>
    </main>
  );
}
