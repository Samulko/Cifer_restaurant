'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis';
import ReservationButton from './ReservationButton';
import ReservationForm from './ReservationForm';
import { translations as enTranslations } from '../../public/locales/en';
import { translations as skTranslations } from '../../public/locales/sk';

const ImageScroll = ({ currentLanguage }) => {
  const scrollContainerRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  
  // Use useMemo to memoize the translations and sections
  const translations = useMemo(() => 
    currentLanguage === 'en' ? enTranslations : skTranslations,
    [currentLanguage]
  );
  
  const sections = useMemo(() => [
    {
      id: 'home',
      image: '/images/DSC_3061-HDR.webp',
      title: translations.sections.home.title,
      description: translations.sections.home.description
    },
    {
      id: 'about',
      image: '/images/DSC_2299-HDR.webp',
      title: translations.sections.about.title,
      description: translations.sections.about.description
    },
    {
      id: 'menu',
      image: '/images/DSC_2620-HDR.webp',
      title: translations.sections.menu.title,
      description: translations.sections.menu.description
    },
    {
      id: 'contact',
      image: '/images/DSC_2689-HDR.webp',
      title: translations.sections.contact.title,
      description: translations.sections.contact.description
    },
    {
      id: 'reservation',
      image: '/images/DSC_3016-HDR.webp',
      title: translations.sections.reservation.title,
      description: translations.sections.reservation.description
    }
  ], [translations]);

  const additionalImages = [
    '/images/DSC_2776-HDR.webp',
    '/images/DSC_2848-HDR.webp',
    '/images/DSC_2905-HDR.webp'
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
        className="scroll-container fixed inset-0 bg-white h-[calc(var(--vh,1vh)*100)] overflow-y-auto"
        data-lenis-prevent={isTouch}
      >
        {/* Main Sections */}
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="relative min-h-screen w-full px-8 md:px-16 py-12"
            data-section-id={section.id}
          >
            {index > 0 && (
              <div className="absolute top-0 left-8 md:left-16 right-8 md:right-16 h-16 z-10 bg-gradient-to-b from-white to-transparent" />
            )}
            
            <div className="image-container relative w-full h-[80vh] flex items-center justify-center overflow-hidden opacity-0 transition-all duration-1000 rounded-lg">
              <div className="relative w-full h-full transition-all duration-700 hover:brightness-110">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 84vw, 90vw"
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
                <div className="w-full max-w-4xl px-4">
                  <h2 className="text-4xl md:text-6xl font-bold mb-8 [text-shadow:_2px_2px_10px_rgb(0_0_0_/_90%)]">
                    {section.title}
                  </h2>
                  {section.id === 'reservation' ? (
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                      <ReservationForm currentLanguage={currentLanguage} />
                    </div>
                  ) : (
                    <p className="text-xl md:text-2xl [text-shadow:_2px_2px_8px_rgb(0_0_0_/_90%)]">
                      {section.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Additional Images */}
        {additionalImages.map((src, index) => (
          <div 
            key={src} 
            className="relative min-h-screen w-full px-8 md:px-16 py-12"
          >
            <div className="absolute top-0 left-8 md:left-16 right-8 md:right-16 h-16 z-10 bg-gradient-to-b from-white to-transparent" />
            <div className="image-container relative w-full h-[80vh] flex items-center justify-center overflow-hidden opacity-0 transition-all duration-1000 rounded-lg">
              <div className="relative w-full h-full transition-all duration-700 hover:brightness-110">
                <Image
                  src={src}
                  alt={`Additional restaurant ambiance ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 84vw, 90vw"
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
