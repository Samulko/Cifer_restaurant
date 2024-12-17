'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';

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

    const imgContainer = currentSlideElement;
    if (!imgContainer) return;

    const computedStyle = getComputedStyle(imgContainer);
    const backgroundColor = computedStyle.backgroundColor;

    const rgbMatch = backgroundColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);

    if (rgbMatch) {
      const r = parseInt(rgbMatch[1], 10);
      const g = parseInt(rgbMatch[2], 10);
      const b = parseInt(rgbMatch[3], 10);

      const invertedR = 255 - r;
      const invertedG = 255 - g;
      const invertedB = 255 - b;

      const textColor = `rgb(${invertedR}, ${invertedG}, ${invertedB})`;

      texts.forEach(textItem => {
        if (textItem.ref.current) {
          textItem.ref.current.style.color = textColor;
        }
      });
      console.log(`Slide ${currentSlide}: Background RGB(${r},${g},${b}), Inverted RGB: ${invertedR},${invertedG},${invertedB}`);
    } else {
        console.log(`Slide ${currentSlide}: Could not parse background color: ${backgroundColor}`);
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
      const scrollY = lenis.scroll;
      const windowHeight = window.innerHeight;
      const newSlide = Math.floor(scrollY / windowHeight);

      if (newSlide !== currentSlide && newSlide >= 0 && newSlide < images.length) {
          setCurrentSlide(newSlide);
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
            className={`h-screen w-full relative`}
            style={{ backgroundColor: 'rgb(0,0,0)' }}
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
