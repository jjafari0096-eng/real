'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function HorizonLine() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // For users who prefer reduced motion, still update progress but without animations
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        setScrollProgress(progress);
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }

    gsap.registerPlugin(ScrollTrigger);

    // Create scroll trigger to track progress across the entire page
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setScrollProgress(self.progress * 100);
      },
    });

    // Reset progress when page changes
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      setScrollProgress(0);
    };
  }, []);

  return (
    <div className="horizon-line">
      <div 
        className="horizon-marker"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}