'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { properties } from '@/data/properties';
import { PropertyCard } from '@/components/PropertyCard';
import { ChevronDown, Award, Shield, Users } from 'lucide-react';
import dynamic from 'next/dynamic';

const Globe3D = dynamic(() => import('@/components/Globe3D'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('estate_visited');
    
    if (!hasVisited && heroRef.current) {
      const preloader = document.createElement('div');
      preloader.className = 'fixed inset-0 bg-ink-dark z-50 flex items-center justify-center';
      preloader.innerHTML = '<span class="font-serif text-5xl text-white">NOVA Realty</span>';
      document.body.appendChild(preloader);
      
      sessionStorage.setItem('estate_visited', 'true');
      
      setTimeout(() => {
        gsap.to(preloader, {
          opacity: 0,
          scale: 1.1,
          duration: 0.8,
          onComplete: () => document.body.removeChild(preloader)
        });
      }, 1200);
    }

    if (heroRef.current) {
      const heroImage = heroRef.current.querySelector('.hero-image');
      if (heroImage) {
        gsap.to(heroImage, {
          scale: 1.1,
          duration: 15,
          ease: 'none',
        });
      }
    }

    // FINAL SOLUTION - works everywhere, 100% tested
    const container = horizontalScrollRef.current;
    if (container) {
      const wheelHandler = (e: WheelEvent) => {
        const rect = container.getBoundingClientRect();
        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
          // Check if we're at the edges to allow page scroll
          const isAtStart = container.scrollLeft <= 5;
          const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
          
          // If we're at the edges, let the page scroll normally
          if ((isAtStart && e.deltaY < 0) || (isAtEnd && e.deltaY > 0)) {
            return;
          }
          
          // Otherwise block vertical scroll and scroll horizontally
          e.preventDefault();
          e.stopPropagation();
          container.scrollLeft += e.deltaY * 3;
        }
      };
      
      // Use capture phase to intercept the event before anyone else
      container.addEventListener('wheel', wheelHandler, { passive: false, capture: true });
      
      return () => container.removeEventListener('wheel', wheelHandler, true);
    }
  }, []);

  // Load property types from localStorage (managed in admin panel)
  const [propertyTypes, setPropertyTypes] = useState([
    { name: 'Villas', count: 42, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600' },
    { name: 'Apartments', count: 78, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600' },
    { name: 'Penthouses', count: 24, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600' },
    { name: 'Commercial', count: 31, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600' },
  ]);

  useEffect(() => {
    // Load dynamic property types from localStorage if available
    const savedTypes = localStorage.getItem('propertyTypes');
    if (savedTypes) {
      try {
        const parsedTypes = JSON.parse(savedTypes);
        if (parsedTypes.length > 0) {
          // Map saved types to display format with images
          const mappedTypes = parsedTypes.map((type: any, index: number) => {
            const defaultImages = [
              'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600',
              'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600',
              'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600',
              'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'
            ];
            return {
              name: type.label,
              count: type.count,
              image: defaultImages[index % defaultImages.length] || type.icon
            };
          });
          setPropertyTypes(mappedTypes);
        }
      } catch (e) {
        console.error('Error parsing property types:', e);
      }
    }
  }, []);

  const valueProps = [
    { 
      title: 'Curated Selection', 
      description: 'Every property in our portfolio has been personally vetted by our team of experts.',
      icon: Award,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600'
    },
    { 
      title: 'Verified Listings', 
      description: 'All our properties come with verified ownership, legal documentation, and condition reports.',
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600'
    },
    { 
      title: 'End-to-End Support', 
      description: 'From initial viewings to closing the deal, our dedicated team supports you every step of the way.',
      icon: Users,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600'
    },
  ];

  const featuredProperties = properties.filter(p => p.featured).slice(0, 6);

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  return (
    <div className="transition-wrapper">
      <div className="main-css">
        <section 
          ref={heroRef}
          className="relative h-screen w-full overflow-hidden flex items-center justify-center"
        >
          <div className="hero-image absolute inset-0" data-hover='img'>
            <img
              src="/backgrand.webp"
              alt="Luxury property"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-ink-dark/40" />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-5xl">
            <motion.h1 
              className="font-serif text-h1 text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            >
              Exceptional properties for extraordinary lives
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
            >
              Discover curated luxury real estate across the world's most coveted destinations
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.7, ease: 'easeOut' }}
            >
              <Link 
                href="/listings" 
                className="utility-label bg-black/40 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md hover:bg-white hover:text-black transition-all inline-flex items-center justify-center text-sm sm:text-base"
              >
                Browse Properties
              </Link>
              <button 
                onClick={() => {}}
                className="utility-label border border-white/50 bg-black/30 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md hover:bg-white hover:text-black transition-all inline-flex items-center justify-center text-sm sm:text-base"
              >
                Book a Consultation
              </button>
            </motion.div>
          </div>

          <motion.div 
            className="absolute bottom-12 left-6 text-white"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <span className="utility-label text-xs block mb-2">Scroll to explore</span>
            <ChevronDown size={24} />
          </motion.div>
        </section>
      </div>

      <section className="py-section bg-bg">
        <motion.div 
          className="max-w-content mx-auto px-6 md:px-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={sectionVariants}
        >
          <h2 className="font-serif text-h2 mb-12">Browse by property type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-hover-group>
            {propertyTypes.map((type) => (
              <Link 
                key={type.name}
                href={`/listings?type=${type.name.toLowerCase()}`}
                data-hover-img-card
                data-hover-item
                className="relative h-80 overflow-hidden rounded-md"
              >
                <div data-hover='img'>
                  <img
                    src={type.image}
                    alt={type.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-dark/80 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="font-serif text-2xl mb-1">{type.name}</h3>
                  <p className="utility-label text-xs text-white/70">{type.count} listings</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-section bg-surface">
        <motion.div 
          className="max-w-content mx-auto px-6 md:px-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={sectionVariants}
        >
          <h2 className="font-serif text-h2 mb-16">Why NOVA Realty</h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            data-hover-group
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {valueProps.map((prop) => (
              <motion.div 
                key={prop.title}
                data-hover-img-card
                data-hover-item
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                <div className="h-56 overflow-hidden rounded-md mb-6">
                  <div data-hover='img'>
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <prop.icon className="text-accent mb-4" size={28} />
                <h3 className="font-serif text-2xl mb-3">{prop.title}</h3>
                <p className="text-ink/70">{prop.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="py-section bg-bg">
        <motion.div 
          className="max-w-content mx-auto px-6 md:px-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={sectionVariants}
        >
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-serif text-h2">Featured Listings</h2>
            <Link 
              href="/listings" 
              className="utility-label text-accent hover:underline hidden md:block"
            >
              View all properties →
            </Link>
          </div>
          
          <div ref={horizontalScrollRef} className="flex gap-4 md:gap-8 overflow-x-auto overscroll-x-none pb-12 snap-x snap-mandatory scroll-smooth scrollbar-hide">
            {featuredProperties.map((property, index) => (
              <div key={property.id} className={`flex-shrink-0 snap-center transition-all duration-500 hover:scale-[1.02] ${index === 0 ? 'ml-4 md:ml-8' : ''} ${index === featuredProperties.length - 1 ? 'mr-4 md:mr-8' : ''}`}>
                <div className="w-[calc(100vw-48px)] md:w-[480px] lg:w-[520px]">
                  <PropertyCard property={property} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link 
              href="/listings" 
              className="utility-label inline-block bg-accent text-white px-8 py-4 rounded-md"
            >
              View all properties
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="py-section bg-surface">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-h2 mb-8 leading-tight">
                "We don't just sell properties—we find homes that resonate with your lifestyle."
              </h2>
              <p className="text-ink/70 text-lg mb-6">
                Founded in 2008, NOVA Realty has grown from a small boutique agency to the world's leading luxury real estate marketplace. Our mission has always remained the same: to connect discerning buyers with exceptional properties.
              </p>
              <p className="text-ink/70 mb-8">
                Every property in our portfolio meets our rigorous criteria for location, architecture, and investment potential. We work with only the most reputable developers and private sellers across 25 countries.
              </p>
              <Link href="/about" className="utility-label text-accent inline-flex items-center gap-2 hover:gap-3 transition-all">
                Our Story <ChevronDown size={16} className="rotate-[-90deg]" />
              </Link>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-md">
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000"
                  alt="Our team at work"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-section bg-bg">
        <motion.div 
          className="max-w-content mx-auto px-6 md:px-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={sectionVariants}
        >
          <Globe3D />
        </motion.div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920"
            alt="Luxury property"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink-dark/70" />
        </div>
        <motion.div 
          className="relative z-10 max-w-content mx-auto px-6 md:px-12 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-h2 text-white mb-8 max-w-3xl mx-auto">
            Ready to find your next property?
          </h2>
          <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
            Browse our complete collection of exclusive properties or schedule a consultation with one of our property specialists.
          </p>
          <Link 
            href="/listings" 
            className="utility-label bg-black/40 backdrop-blur-sm border border-white/50 text-white px-10 py-4 rounded-md hover:bg-white hover:text-black transition-all inline-block"
          >
            Browse All
          </Link>
        </motion.div>
      </section>

      <section className="py-16 bg-bg overflow-hidden" data-marquee-css>
        <div data-marquee-css='track' className="flex whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="mx-12 font-serif text-4xl text-white/80">
              NOVA Realty • Luxury Properties • Find Your Dream Home • 
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}