'use client';

import './globals.css';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Clean up any existing Lenis instance when layout changes
    return () => {
      if (window.lenis) {
        window.lenis.destroy();
        window.lenis = null;
      }
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Cifer Restaurant</title>
        <meta name="description" content="Fine dining experience" />
      </head>
      <body>
        <div id="root" className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}