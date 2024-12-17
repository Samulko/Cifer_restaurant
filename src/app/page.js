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
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className="fixed top-4 right-4 w-12 h-12 bg-blue-600 text-white border-none rounded cursor-pointer hover:bg-blue-700 transition-colors z-50"
      >
        ↑
      </button>
    </main>
  );
}
