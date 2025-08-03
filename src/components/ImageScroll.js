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
  const [isMobile, setIsMobile] = useState(false);

  // Helper function to get responsive image path
  const getImagePath = (imageNumber) => {
    const folder = isMobile ? 'mobile' : 'desktop';
    const basePath = process.env.NODE_ENV === 'production' ? '/Cifer_restaurant' : '';
    return `${basePath}/images/${folder}/${imageNumber.toString().padStart(3, '0')}.webp`;
  };
  
  // Use useMemo to memoize the translations and sections
  const translations = useMemo(() => 
    currentLanguage === 'en' ? enTranslations : skTranslations,
    [currentLanguage]
  );
  
  const sections = useMemo(() => [
    {
      id: 'home',
      image: getImagePath(1),
      title: translations.sections.home.title,
      description: translations.sections.home.description
    },
    {
      id: 'about',
      image: getImagePath(2),
      title: translations.sections.about.title,
      description: translations.sections.about.description
    },
    {
      id: 'menu',
      image: getImagePath(3),
      title: translations.sections.menu.title,
      description: translations.sections.menu.description
    },
    {
      id: 'contact',
      image: getImagePath(4),
      title: translations.sections.contact.title,
      description: translations.sections.contact.description
    },
    {
      id: 'reservation',
      image: getImagePath(5),
      title: translations.sections.reservation.title,
      description: translations.sections.reservation.description
    }
  ], [translations, isMobile]);

  const additionalImages = useMemo(() => [
    getImagePath(6),
    getImagePath(7),
    getImagePath(8),
    getImagePath(9),
    getImagePath(10),
    getImagePath(11)
  ], [isMobile]);

  useEffect(() => {
    // Detect touch device and screen size
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    setIsMobile(window.innerWidth < 768);

    // Handle resize to update mobile detection  
    const handleMobileResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleMobileResize);

    if (!scrollContainerRef.current) return;

    // Initialize Lenis with optimized settings for performance
    const lenis = new Lenis({
      wrapper: scrollContainerRef.current,
      content: scrollContainerRef.current,
      duration: 1.2, // Reduced for smoother performance
      easing: (t) => 1 - Math.pow(1 - t, 3), // Simpler cubic-out easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false, // Disable smooth scrolling on touch devices
      touchMultiplier: 1.2, // Reduced for better control
      wheelMultiplier: 0.8, // Reduced for smoother scrolling
      touchInertiaMultiplier: 8, // Reduced for less aggressive scroll
      normalizeWheel: true,
      infinite: false,
      syncTouch: true // Better touch handling
    });

    // Store lenis instance globally
    window.lenis = lenis;

    let rafId = null;
    let lastTime = 0;
    function raf(time) {
      // Throttle to 60fps for better performance
      if (time - lastTime >= 16.67) {
        lenis.raf(time);
        lastTime = time;
      }
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

    // Optimized Intersection Observer with debouncing
    const observer = new IntersectionObserver(
      (entries) => {
        // Use requestAnimationFrame to batch DOM updates
        requestAnimationFrame(() => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
              entry.target.classList.add('animate-fade-in');
              entry.target.classList.remove('opacity-0');
              observer.unobserve(entry.target);
            }
          });
        });
      },
      {
        threshold: [0.1, 0.2],
        root: scrollContainerRef.current,
        rootMargin: '50px' // Preload images slightly before they come into view
      }
    );

    // Use setTimeout to avoid blocking initial render
    setTimeout(() => {
      const imageContainers = document.querySelectorAll('.image-container');
      imageContainers.forEach((img) => {
        observer.observe(img);
      });
    }, 100);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      lenis.destroy();
      window.lenis = null;
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleMobileResize);
      console.log('Lenis destroyed');
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#F5F1EA]">
      <div 
        ref={scrollContainerRef}
        className="scroll-container fixed inset-0 bg-[#F5F1EA] h-[calc(var(--vh,1vh)*100)] overflow-y-auto before:content-[''] before:fixed before:inset-0 before:w-full before:h-full before:bg-noise before:opacity-[0.08] before:pointer-events-none before:z-50"
        style={{
          '--tw-bg-opacity': '1',
          backgroundColor: '#F5F1EA',
        }}
        data-lenis-prevent={isTouch}
      >
        {/* Main Sections */}
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={`relative min-h-screen w-full px-4 sm:px-8 md:px-16 ${
              index === 0 
                ? 'pt-20 sm:pt-24 md:pt-28 pb-16 md:pb-20' 
                : 'py-16 sm:py-20 md:py-24'
            }`}
            data-section-id={section.id}
          >
            {/* Section Content */}
            <div className="w-full max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6 sm:mb-8 md:mb-12 text-[#1a1a1a] leading-tight tracking-tight">
                {section.title}
              </h2>
              {section.id === 'reservation' ? (
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-xl">
                  <ReservationForm currentLanguage={currentLanguage} />
                </div>
              ) : (
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#1a1a1a] leading-relaxed max-w-3xl tracking-wide opacity-90">
                  {section.description}
                </p>
              )}
            </div>

            <div className="image-container relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden opacity-0 transition-all duration-1000 rounded-xl shadow-lg">
              <div className="relative w-full h-full transition-all duration-700 hover:brightness-110">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  quality={isMobile ? 75 : 85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </div>
          </section>
        ))}

        {/* Additional Images */}
        {additionalImages.map((src, index) => (
          <div 
            key={src} 
            className="relative min-h-screen w-full px-4 sm:px-8 md:px-16 py-16 sm:py-20 md:py-24"
          >
            <div className="image-container relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden opacity-0 transition-all duration-1000 rounded-xl shadow-lg">
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
