'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis';

const ImageScroll = () => {
  const scrollContainerRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  
  const sections = [
    {
      id: 'home',
      image: '/images/DSC_3061-HDR.webp',
      title: 'Welcome to Haji',
      description: 'Fine Dining Experience'
    },
    {
      id: 'about',
      image: '/images/DSC_2299-HDR.webp',
      title: 'Our Story',
      description: 'A Journey Through Flavors'
    },
    {
      id: 'menu',
      image: '/images/DSC_2620-HDR.webp',
      title: 'Our Menu',
      description: 'Culinary Excellence'
    },
    {
      id: 'contact',
      image: '/images/DSC_2689-HDR.webp',
      title: 'Get in Touch',
      description: 'Make a Reservation'
    }
  ];

  const additionalImages = [
    '/images/DSC_2776-HDR.webp',
    '/images/DSC_2848-HDR.webp',
    '/images/DSC_2905-HDR.webp',
    '/images/DSC_3016-HDR.webp'
  ];

  useEffect(() => {
    // Detect touch device
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);

    if (!scrollContainerRef.current) return;

    // Initialize Lenis with the scroll container
    const lenis = new Lenis({
      wrapper: scrollContainerRef.current,
      content: scrollContainerRef.current,
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(5, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false, // Disable smooth scrolling on touch devices
      touchMultiplier: 1.5,
      wheelMultiplier: 1.0,
      touchInertiaMultiplier: 12,
      normalizeWheel: true,
      infinite: false
    });

    // Store lenis instance globally
    window.lenis = lenis;

    let rafId = null;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    console.log('Lenis initialized with scroll container');

    // Handle resize for viewport height
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      lenis.resize(); // Update Lenis on resize
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    // Intersection Observer for fade-in animation
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
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      lenis.destroy();
      window.lenis = null;
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      console.log('Lenis destroyed');
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black">
      <div 
        ref={scrollContainerRef}
        className="scroll-container"
        data-lenis-prevent={isTouch}
      >
        {/* Main Sections */}
        {sections.map((section, index) => (
          <section 
            key={section.id}
            id={section.id}
            className="relative min-h-screen w-full"
            data-section-id={section.id}
          >
            {index > 0 && (
              <div className="absolute top-0 left-0 w-full h-16 z-10 bg-gradient-to-b from-black to-transparent" />
            )}
            
            <div className="image-container relative w-full h-full flex items-center justify-center overflow-hidden opacity-0 transition-all duration-1000">
              <div className="relative w-[120%] h-full transition-all duration-700 hover:brightness-110">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                  sizes="120vw"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  quality={90}
                />
              </div>

              {/* Section Content Overlay */}
              <div 
                className="absolute inset-0 flex items-center justify-center text-center z-10"
                style={{ 
                  mixBlendMode: 'difference',
                  color: 'white'
                }}
              >
                <div>
                  <h2 className="text-4xl md:text-6xl font-bold mb-4 [text-shadow:_2px_2px_10px_rgb(0_0_0_/_90%)]">
                    {section.title}
                  </h2>
                  <p className="text-xl md:text-2xl [text-shadow:_2px_2px_8px_rgb(0_0_0_/_90%)]">
                    {section.description}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Additional Images */}
        {additionalImages.map((src, index) => (
          <div 
            key={src} 
            className="relative min-h-screen w-full"
          >
            <div className="absolute top-0 left-0 w-full h-16 z-10 bg-gradient-to-b from-black to-transparent" />
            <div className="image-container relative w-full h-full flex items-center justify-center overflow-hidden opacity-0 transition-all duration-1000">
              <div className="relative w-[120%] h-full transition-all duration-700 hover:brightness-110">
                <Image
                  src={src}
                  alt={`Additional restaurant ambiance ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="120vw"
                  loading="lazy"
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
