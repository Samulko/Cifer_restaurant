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
        className="fixed bottom-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full cursor-pointer hover:bg-white/20 transition-colors z-50 flex items-center justify-center text-2xl"
      >
        ↑
      </button>
    </main>
  );
}
