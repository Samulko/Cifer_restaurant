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
        <section className="smooth-scroll-section">
          <div className="overlay-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Welcome to Haj
          </div>
          <ImageScroll src="/images/hero.jpg" alt="Cifer Restaurant Hero" />
        </section>

        <section className="smooth-scroll-section">
          <div className="overlay-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Fine Dining Experience
          </div>
          <ImageScroll src="/images/dining.jpg" alt="Dining Experience" />
        </section>

        <section className="smooth-scroll-section">
          <div className="overlay-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Culinary Excellence
          </div>
          <ImageScroll src="/images/food.jpg" alt="Culinary Dishes" />
        </section>
      </SmoothScroll>
      <button id="scrollToTop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ position: 'fixed', top: '10px', right: '10px', width: '50px', height: '50px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>↑</button>
    </main>
  );
}
