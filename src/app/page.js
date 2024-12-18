'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

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

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black">
      <ImageScroll />
      <ScrollToTop />
    </main>
  );
}
