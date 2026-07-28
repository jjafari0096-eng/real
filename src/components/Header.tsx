'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { InquiryModal } from './InquiryModal';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Header background becomes solid after scrolling past 100px
      setIsScrolled(currentScrollY > 100);
      
      // Hide header when scrolling down past 200px, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
          { name: 'Home', path: '/' },
          { name: 'Listings', path: '/listings' },
          { name: 'About', path: '/about' },
          { name: 'Contact', path: '/contact' },
        ];

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: 'easeOut', staggerChildren: 0.06, delayChildren: 0.1 }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <>
            {/* Desktop Vertical Header - Right Side */}
      <motion.header 
        className="hidden md:flex fixed top-0 right-8 h-screen z-40 items-center"
        initial={{ x: 0 }}
        animate={{ x: isVisible ? 0 : 100 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col items-center gap-8 py-8 backdrop-blur-xl bg-white/10 rounded-full p-4 border border-white/20 shadow-2xl">
          {/* Logo */}
          <Link href="/" className="mb-4 font-serif text-xs tracking-[0.2em] text-white drop-shadow-md hover:text-accent transition-colors">
            NOVA
          </Link>

          {/* Divider */}
          <div className="w-px h-12 bg-white/30"></div>

          {/* Vertical Navigation */}
          <nav className="flex flex-col items-center gap-14">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => {
                  if (link.path === '/') {
                    window.location.href = '/';
                  }
                }}
                className={`font-serif text-sm tracking-wider transition-all duration-300 rotate-90 origin-center whitespace-nowrap ${
                  pathname === link.path 
                    ? 'text-accent' 
                    : 'text-white/90 hover:text-white hover:scale-110'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="w-px h-12 bg-white/30"></div>

          {/* Get in Touch Button - iPhone style */}
          <button
            onClick={() => setInquiryModalOpen(true)}
            className="backdrop-blur-xl bg-white/20 border border-white/30 text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center gap-2 text-xs font-medium shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Phone size={12} />
            Get in Touch
          </button>
        </div>
      </motion.header>

      {/* Mobile Header - Top */}
      <motion.header 
        className={`md:hidden fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled ? 'bg-surface/90 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-content mx-auto px-6 py-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-serif text-xl tracking-tight">
            <span className={isScrolled ? 'text-ink' : 'text-white drop-shadow-sm'}>NOVA Realty</span>
          </Link>

          {/* Right side: menu button */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`p-2 ${isScrolled ? 'text-ink' : 'text-white'}`}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-ink-dark z-50 flex items-center justify-center"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-ink-inverse p-2"
              aria-label="Close menu"
            >
              <X size={32} />
            </button>
            
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div key={link.path} variants={linkVariants}>
                  <Link
                    href={link.path}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (link.path === '/') {
                        window.location.href = '/';
                      }
                    }}
                    className="font-serif text-h2 text-ink-inverse hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                variants={linkVariants}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setInquiryModalOpen(true);
                }}
                className="mt-8 backdrop-blur-xl bg-white/20 border border-white/30 text-white px-8 py-4 rounded-full"
              >
                Get in Touch
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inquiry Modal */}
      <InquiryModal 
        isOpen={inquiryModalOpen} 
        onClose={() => setInquiryModalOpen(false)} 
      />
    </>
  );
}