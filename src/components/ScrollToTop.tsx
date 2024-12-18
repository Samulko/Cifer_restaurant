'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const birdRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Transform scroll progress into different wiggle parameters
  const wiggleXMultiplier = useTransform(scrollYProgress, [0, 0.5, 1], [2, 3, 4]);
  const wiggleYMultiplier = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 2]);
  const rotateMultiplier = useTransform(scrollYProgress, [0, 0.5, 1], [3, 5, 7]);
  const frequencyMultiplier = useTransform(scrollYProgress, [0, 0.5, 1], [0.01, 0.015, 0.02]);

  useEffect(() => {
    let rafId: number;

    const animate = () => {
      if (window.lenis && birdRef.current) {
        const scroll = window.lenis.scroll;
        const currentWiggleX = wiggleXMultiplier.get();
        const currentWiggleY = wiggleYMultiplier.get();
        const currentRotate = rotateMultiplier.get();
        const currentFreq = frequencyMultiplier.get();

        const wiggleX = Math.sin(scroll * currentFreq) * currentWiggleX;
        const wiggleY = Math.cos(scroll * (currentFreq * 0.75)) * currentWiggleY;
        const rotate = Math.sin(scroll * (currentFreq * 0.5)) * currentRotate;
        
        birdRef.current.style.transform = `
          translate(${wiggleX}px, ${wiggleY}px) 
          rotate(${rotate}deg)
        `;
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [wiggleXMultiplier, wiggleYMultiplier, rotateMultiplier, frequencyMultiplier]);

  const scrollToTop = () => {
    setIsVisible(false);
    if (window.lenis) {
      window.lenis.scrollTo(0, { 
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
    setTimeout(() => setIsVisible(true), 600);
  };

  const gateVariants = {
    left: {
      closed: { x: "0%" },
      open: { x: "-100%" }
    },
    right: {
      closed: { x: "-0%" },
      open: { x: "100%" }
    }
  };

  const birdVariants = {
    initial: {
      opacity: 0,
      scale: 0.6,
      y: -20
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 2,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      y: -100,
      scale: 0.6,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.button 
      onClick={scrollToTop}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="fixed top-12 right-8 w-12 h-12 border-2 border-white rounded-md
                flex items-center justify-center
                bg-black/50 z-[9999] overflow-hidden
                transition-colors duration-300 ease-in-out
                hover:bg-white hover:border-black/50
                group"
      aria-label="Scroll to top"
    >
      {/* Left Gate */}
      <motion.div 
        className="absolute inset-0 w-1/2 h-full bg-black/50 border-r border-white/20"
        initial="closed"
        animate={isHovered ? "open" : "closed"}
        variants={gateVariants.left}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      
      {/* Right Gate */}
      <motion.div 
        className="absolute inset-0 w-1/2 h-full bg-black/50 border-l border-white/20"
        style={{ left: "50%" }}
        initial="closed"
        animate={isHovered ? "open" : "closed"}
        variants={gateVariants.right}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />

      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            ref={birdRef}
            className="text-white group-hover:text-black transition-transform duration-0 relative z-10"
            variants={birdVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            style={{ transformOrigin: 'center' }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="lucide lucide-bird"
            >
              <path d="M16 7h.01"/>
              <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/>
              <path d="m20 7 2 .5-2 .5"/>
              <path d="M10 18v3"/>
              <path d="M14 17.75V21"/>
              <path d="M7 18a6 6 0 0 0 3.84-10.61"/>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

declare global {
  interface Window {
    lenis: any;
  }
}

export default ScrollToTop;
