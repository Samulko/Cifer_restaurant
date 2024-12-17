'use client';

import { useEffect, useState, ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const lenis = new Lenis({
      duration: 1.8,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      syncTouch: true,
      syncTouchLerp: 0.05,
      touchInertiaMultiplier: 12,
      easing: (t) => Math.min(1, 1.001 - Math.pow(5, -10 * t)),
      infinite: false,
      orientation: 'vertical',
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return <div className="smooth-scroll-wrapper">{children}</div>;
}
