'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Check } from 'lucide-react';

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
  });

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen) {
      // Store the active element to return focus later
      const activeElement = document.activeElement as HTMLElement;
      closeButtonRef.current?.focus();
      
      return () => {
        activeElement?.focus();
      };
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        reset();
        setSubmitted(false);
      }, 300);
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: InquiryFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Inquiry submitted:', data);
    setSubmitted(true);
  };

  const modalVariants = {
    closed: {
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.2, ease: 'easeIn' }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-ink-dark/80 backdrop-blur-sm"
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="relative bg-surface rounded-md w-full max-w-lg mx-auto p-8 md:p-10 shadow-2xl"
            initial="closed"
            animate="open"
            exit="closed"
            variants={modalVariants}
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-title"
          >
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-ink/70 hover:text-ink transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {!submitted ? (
              <>
                <h2 id="inquiry-title" className="font-serif text-3xl mb-2 text-ink">Request a Consultation</h2>
                <p className="text-ink/70 mb-8">Fill out the form below and our property specialists will be in touch within 24 hours.</p>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block utility-label text-xs mb-2 text-ink/80">Full Name</label>
                    <input
                      id="name"
                      {...register('name')}
                      className="w-full px-4 py-3 bg-white border border-ink/10 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block utility-label text-xs mb-2 text-ink/80">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="w-full px-4 py-3 bg-white border border-ink/10 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block utility-label text-xs mb-2 text-ink/80">Phone (Optional)</label>
                    <input
                      id="phone"
                      {...register('phone')}
                      className="w-full px-4 py-3 bg-white border border-ink/10 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block utility-label text-xs mb-2 text-ink/80">Message</label>
                    <textarea
                      id="message"
                      {...register('message')}
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-ink/10 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about the properties you're interested in..."
                    />
                    {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full utility-label bg-accent text-white py-4 rounded-md hover:bg-accent/90 transition-colors disabled:opacity-70 mt-6"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <motion.svg 
                  className="w-20 h-20 mx-auto mb-6 text-accent-secondary"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  initial="hidden"
                  animate="visible"
                  variants={checkmarkVariants}
                >
                  <motion.path d="M5 13l4 4L19 7" variants={checkmarkVariants} />
                </motion.svg>
                <h2 id="inquiry-title" className="font-serif text-3xl mb-3 text-ink">Thank You</h2>
                <p className="text-ink/70 mb-8">Your inquiry has been received. A member of our team will contact you shortly.</p>
                <button
                  onClick={onClose}
                  className="utility-label bg-ink text-white px-8 py-3 rounded-md hover:bg-ink/90 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}