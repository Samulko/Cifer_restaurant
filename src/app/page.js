'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '../components/Navigation';
import ScrollToTop from '../components/ScrollToTop';
import ReservationButton from '../components/ReservationButton';

// Dynamically import ImageScroll with no SSR to ensure client-side only
const ImageScroll = dynamic(() => import('../components/ImageScroll'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-white text-2xl">Loading...</div>
    </div>
  )
});

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay to ensure proper initialization
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      // Clean up Lenis instance if it exists
      if (window.lenis) {
        window.lenis.destroy();
        window.lenis = null;
      }
    };
  }, []);

  // Prevent flash of unstyled content
  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Main scrollable content */}
      <main className="relative w-full">
        <ImageScroll />
      </main>

      {/* Fixed UI elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="pointer-events-auto">
          <Navigation />
        </div>
        <div className="pointer-events-auto">
          <ScrollToTop />
          <ReservationButton />
        </div>
      </div>
    </div>
  );
}
