'use client';

import './globals.css';
import { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);

    // Add lenis-smooth class to html element
    document.documentElement.classList.add('lenis-smooth');

    // Prevent iOS Safari bounce effect
    const preventBounce = (e: TouchEvent) => {
      // Allow scrolling in elements with their own scroll
      if ((e.target as HTMLElement)?.closest('.scroll-container')) {
        return;
      }
      e.preventDefault();
    };

    // Handle iOS Safari viewport height
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Initial setup
    setViewportHeight();
    document.documentElement.style.height = '100%';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';

    // Add event listeners
    window.addEventListener('resize', setViewportHeight);
    if (isTouch) {
      document.addEventListener('touchmove', preventBounce, { passive: false });
    }

    // Handle visibility change (e.g., switching tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Re-initialize viewport height when tab becomes visible
        setViewportHeight();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      // Clean up any existing Lenis instance and classes
      if (window.lenis) {
        window.lenis.destroy();
        window.lenis = null;
      }
      document.documentElement.classList.remove('lenis-smooth');

      // Clean up styles
      document.documentElement.style.removeProperty('height');
      document.documentElement.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('--vh');
      document.body.style.removeProperty('height');
      document.body.style.removeProperty('overflow');

      // Clean up event listeners
      window.removeEventListener('resize', setViewportHeight);
      if (isTouch) {
        document.removeEventListener('touchmove', preventBounce);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isTouch]);

  return (
    <html lang="en" className="antialiased">
      <head>
        <title>Cifer Restaurant</title>
        <meta name="description" content="Fine dining experience" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <div id="root" className="relative min-h-screen overflow-hidden bg-black">
          {children}
        </div>
      </body>
    </html>
  );
}