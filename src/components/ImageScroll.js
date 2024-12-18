'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis';

const ImageScroll = () => {
  const scrollContainerRef = useRef(null);
  
  const images = [
    '/images/DSC_3061-HDR.webp',
    '/images/DSC_2299-HDR.webp',
    '/images/DSC_2620-HDR.webp',
    '/images/DSC_2689-HDR.webp',
    '/images/DSC_2776-HDR.webp',
    '/images/DSC_2848-HDR.webp',
    '/images/DSC_2905-HDR.webp',
    '/images/DSC_3016-HDR.webp'
  ];

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const lenis = new Lenis({
      wrapper: scrollContainerRef.current,
      content: scrollContainerRef.current,
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(5, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1.0,
      touchInertiaMultiplier: 12,
      normalizeWheel: true,
      infinite: false
    });

    // Make lenis instance available globally
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        root: scrollContainerRef.current
      }
    );

    const imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach((img) => {
      observer.observe(img);
    });

    return () => {
      lenis.destroy();
      observer.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black">
      {/* Fixed centered text */}
      <div 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-50"
        style={{ 
          mixBlendMode: 'difference',
          color: 'white'
        }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 [text-shadow:_2px_2px_10px_rgb(0_0_0_/_90%)]">
          Welcome to Haji
        </h1>
        <p className="text-xl md:text-2xl [text-shadow:_2px_2px_8px_rgb(0_0_0_/_90%)]">
          Fine Dining Experience
        </p>
      </div>

      {/* Images Container */}
      <div 
        ref={scrollContainerRef}
        id="image-scroll-container"
        className="h-screen overflow-y-auto"
      >
        {images.map((src, index) => (
          <div 
            key={src} 
            className="relative h-screen w-full"
          >
            {/* Divider */}
            {index > 0 && (
              <div className="absolute top-0 left-0 w-full h-16 z-10 bg-gradient-to-b from-black to-transparent" />
            )}
            
            {/* Image Container */}
            <div className="image-container relative w-full h-full flex items-center justify-center overflow-hidden opacity-0 transition-all duration-1000">
              <div className="relative w-[120%] h-full transition-all duration-700 hover:brightness-110">
                <Image
                  src={src}
                  alt={`Restaurant ambiance ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="120vw"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  quality={90}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageScroll;
