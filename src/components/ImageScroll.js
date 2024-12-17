'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis';

const ImageScroll = () => {
  const scrollContainerRef = useRef(null);
  const welcomeTextRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
      lenis.raf(time);
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

    const updateTextColor = () => {
      if (!welcomeTextRef.current) {
        console.log("welcomeTextRef is null");
        return;
      }
      const currentSlideElement = scrollContainerRef.current.children[currentSlide];
      if (!currentSlideElement) {
        console.log("currentSlideElement is null");
        return;
      }
      const imageContainer = currentSlideElement.querySelector('.image-container');
      if (!imageContainer) {
        console.log("imageContainer is null");
        return;
      }

      const backgroundColor = window.getComputedStyle(imageContainer).backgroundColor;
      console.log("backgroundColor:", backgroundColor);
      const rgbValues = backgroundColor.match(/\d+/g);
      console.log("rgbValues:", rgbValues);

      if (rgbValues && rgbValues.length === 3) {
        const invertedR = 255 - parseInt(rgbValues[0], 10);
        const invertedG = 255 - parseInt(rgbValues[1], 10);
        const invertedB = 255 - parseInt(rgbValues[2], 10);

        const invertedColor = `rgb(${invertedR}, ${invertedG}, ${invertedB})`;
        console.log("invertedColor:", invertedColor);
        welcomeTextRef.current.style.color = invertedColor;
      }
    };

    updateTextColor();
    console.log("welcomeTextRef after initial render:", welcomeTextRef.current);

    lenis.on('scroll', () => {
      const newSlide = Math.round(lenis.scroll / window.innerHeight);
      console.log("newSlide:", newSlide, "currentSlide:", currentSlide);
      if (newSlide !== currentSlide) {
        setCurrentSlide(newSlide);
        updateTextColor();
      }
    });

    window.addEventListener('resize', updateTextColor);

    return () => {
      lenis.destroy();
      observer.disconnect();
      window.removeEventListener('resize', updateTextColor);
    };
  }, [currentSlide]);

  return (
    <div className="fixed inset-0 bg-black">
      {/* Welcome Title */}
      <div className="fixed top-0 left-0 w-full z-50 p-6">
        <h1 ref={welcomeTextRef} className="text-4xl md:text-6xl font-bold text-center overlay-text">
          Welcome to Haji
        </h1>
      </div>

      {/* Images Container */}
      <div 
        ref={scrollContainerRef}
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
