'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis';

const ImageScroll = () => {
  const scrollContainerRef = useRef(null);
  const welcomeTextRef = useRef(null);
  const diningTextRef = useRef(null);
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

  const texts = [
    { ref: welcomeTextRef, content: "Welcome to Haji" },
    { ref: diningTextRef, content: "Fine Dining Experience" }
  ];

  const updateTextColor = () => {
    if (!scrollContainerRef.current) return;

    const currentSlideElement = scrollContainerRef.current.children[currentSlide];
    if (!currentSlideElement) return;

    const img = currentSlideElement.querySelector('img');
    if (!img || !img.complete) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const { naturalWidth, naturalHeight } = img;
    
    canvas.width = naturalWidth;
    canvas.height = naturalHeight;

    try {
      context.drawImage(img, 0, 0);
      const centerX = Math.floor(naturalWidth / 2);
      const centerY = Math.floor(naturalHeight / 2);
      const pixelData = context.getImageData(centerX, centerY, 1, 1).data;
      
      const brightness = (pixelData[0] * 299 + pixelData[1] * 587 + pixelData[2] * 114) / 1000;
      const textColor = brightness < 128 ? '#ffffff' : '#000000';
      
      const currentText = texts[currentSlide];
      if (currentText && currentText.ref.current) {
        currentText.ref.current.style.color = textColor;
      }
      
      console.log(`Slide ${currentSlide}: RGB(${pixelData[0]},${pixelData[1]},${pixelData[2]}), Brightness: ${brightness}`);
    } catch (error) {
      console.error('Error updating text color:', error);
    }
  };

  useEffect(() => {
    updateTextColor();
  }, [currentSlide]);

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
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', () => {
      const newSlide = Math.floor(lenis.scroll / window.innerHeight);
      if (newSlide !== currentSlide && newSlide >= 0 && newSlide < images.length) {
        const prevSlide = currentSlide;
        setCurrentSlide(newSlide);

        if (scrollContainerRef.current) {
          const prevSlideElement = scrollContainerRef.current.children[prevSlide];
          const newSlideElement = scrollContainerRef.current.children[newSlide];

          if (newSlideElement) {
            newSlideElement.classList.remove('opacity-0');
            newSlideElement.classList.add('opacity-100');
          }
          if (prevSlideElement) {
            prevSlideElement.classList.remove('opacity-100');
            prevSlideElement.classList.add('opacity-0');
          }
        }
      }
    });

    return () => {
      lenis.destroy();
    };
  }, [currentSlide]);

  return (
    <div className="fixed inset-0 bg-black">
      {texts.map((text, index) => (
        <h1
          key={index}
          ref={text.ref}
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-4xl font-light tracking-tight transition-all duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {text.content}
        </h1>
      ))}

      <div 
        ref={scrollContainerRef}
        className="h-screen overflow-y-auto"
      >
        {images.map((src, index) => (
          <div 
            key={index}
            className={`h-screen w-full relative transition-opacity duration-1000 opacity-0`}
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              priority={index === 0}
              onLoad={() => {
                if (index === currentSlide) {
                  updateTextColor();
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageScroll;
