'use client';

import { useEffect, useState, useRef } from 'react';
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
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const mainRef = useRef(null);

  useEffect(() => {
    // Ensure proper initialization order
    const initializePage = async () => {
      // Clean up any existing Lenis instance
      if (window.lenis) {
        window.lenis.destroy();
        window.lenis = null;
      }

      // Wait for DOM to be ready
      await new Promise(resolve => setTimeout(resolve, 100));

      // Set mounted state
      setMounted(true);

      // Set initial viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    initializePage();

    // Handle resize events
    const handleResize = () => {
      // Update viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      // Update Lenis instance if it exists
      if (window.lenis) {
        window.lenis.resize();
      }
    };

    // Handle orientation change on mobile
    const handleOrientationChange = () => {
      // Wait for orientation change to complete
      setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Prevent pull-to-refresh on mobile
    const preventPullToRefresh = (e) => {
      if (e.touches && e.touches[0] && e.touches[0].pageY < 10) {
        e.preventDefault();
      }
    };

    // Always set up touch listeners to avoid hydration mismatch
    document.addEventListener('touchstart', preventPullToRefresh, { passive: false });

    return () => {
      // Clean up Lenis instance
      if (window.lenis) {
        window.lenis.destroy();
        window.lenis = null;
      }

      // Clean up event listeners
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      document.removeEventListener('touchstart', preventPullToRefresh);

      // Clean up viewport height
      document.documentElement.style.removeProperty('--vh');
    };
  }, []);

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'sk' : 'en');
  };

  // Prevent flash of unstyled content
  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div ref={mainRef} className="relative min-h-screen bg-black">
      {/* Main scrollable content */}
      <div className="relative w-full h-screen">
        <ImageScroll currentLanguage={currentLanguage} />
      </div>

      {/* Fixed UI elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="pointer-events-auto">
          <Navigation currentLanguage={currentLanguage} onLanguageChange={toggleLanguage} />
        </div>
        <div className="pointer-events-auto">
          <ScrollToTop />
          <ReservationButton currentLanguage={currentLanguage} onLanguageChange={toggleLanguage} />
        </div>
      </div>
    </div>
  );
}
