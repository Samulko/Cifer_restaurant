'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '../components/Navigation';

const ImageScroll = dynamic(() => import('../components/ImageScroll'), {
  ssr: false
});

const ScrollToTop = dynamic(() => import('../components/ScrollToTop'), {
  ssr: false
});

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen bg-black">
      <Navigation />
      {mounted && (
        <>
          <ImageScroll />
          <ScrollToTop />
        </>
      )}
      <div className="h-[200vh]"></div>
    </main>
  );
}
