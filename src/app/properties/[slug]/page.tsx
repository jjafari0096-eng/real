'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { properties } from '@/data/properties';
import { Property } from '@/types/property';
import { formatCurrency } from '@/lib/utils';
import { Bed, Bath, Maximize2, MapPin, Calendar, Home, X, ChevronLeft, ChevronRight, Phone, MessageSquare, Plus, Minus } from 'lucide-react';
import { InquiryModal } from '@/components/InquiryModal';

interface PropertyPageProps {
  params: {
    slug: string;
  };
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const property = properties.find(p => p.slug === params.slug);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  if (!property) {
    notFound();
  }

  const openLightbox = (index: number) => {
    setActiveImage(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % property.gallery.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + property.gallery.length) % property.gallery.length);
  };

  // Close lightbox on escape key
  useState(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const specs = [
    { label: 'Bedrooms', value: property.specs.bedrooms || 'N/A', icon: Bed },
    { label: 'Bathrooms', value: property.specs.bathrooms, icon: Bath },
    { label: 'Internal Area', value: `${property.specs.areaM2} m²`, icon: Maximize2 },
    { label: 'Plot Size', value: property.specs.plotM2 ? `${property.specs.plotM2} m²` : 'N/A', icon: Home },
    { label: 'Year Built', value: property.specs.yearBuilt || 'N/A', icon: Calendar },
    { label: 'Location', value: `${property.location.city}, ${property.location.region}`, icon: MapPin },
  ];

  // Similar properties - same type, exclude current
  const similarProperties = properties
    .filter(p => p.type === property.type && p.id !== property.id)
    .slice(0, 3);

  return (
    <div className="pt-24 min-h-screen bg-bg">
      {/* Property Gallery */}
      <section className="max-w-content mx-auto px-6 md:px-12 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Image */}
          <div 
            className="lg:col-span-2 aspect-[16/10] overflow-hidden rounded-md cursor-pointer relative group"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={property.gallery[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600'}
              alt={property.gallery[0]?.alt || property.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity utility-label text-white bg-ink-dark/70 px-4 py-2 rounded-md">
                View Gallery
              </span>
            </div>
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {property.gallery.slice(1, 3).map((image, index) => (
              <div 
                key={index}
                className="aspect-video lg:aspect-auto lg:h-[calc(50%-8px)] overflow-hidden rounded-md cursor-pointer relative group"
                onClick={() => openLightbox(index + 1)}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors" />
              </div>
            ))}
            {property.gallery.length > 3 && (
              <div 
                className="hidden lg:block lg:col-span-1 aspect-video lg:h-[calc(50%-8px)] overflow-hidden rounded-md cursor-pointer relative bg-ink-dark"
                onClick={() => openLightbox(3)}
              >
                <Image
                  src={property.gallery[3].url}
                  alt={property.gallery[3].alt}
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-serif text-2xl">+{property.gallery.length - 3}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Property Content */}
      <section className="max-w-content mx-auto px-6 md:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="utility-label text-xs px-3 py-1.5 rounded-sm text-white bg-accent">
                  {property.status.replace('-', ' ')}
                </span>
                <span className="utility-label text-xs px-3 py-1.5 rounded-sm bg-surface text-ink/70">
                  {property.type}
                </span>
              </div>
              <h1 className="font-serif text-h2 mb-3">{property.title}</h1>
              <p className="text-ink/70 flex items-center gap-2 text-lg">
                <MapPin size={18} />
                {property.location.city}, {property.location.region}
              </p>
            </header>

            {/* Description */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl mb-4">About this property</h2>
              <div className={`text-ink/80 leading-relaxed ${!expanded ? 'line-clamp-4' : ''}`}>
                {property.description}
              </div>
              {property.description.length > 200 && (
                <button 
                  onClick={() => setExpanded(!expanded)}
                  className="mt-3 utility-label text-accent flex items-center gap-1 hover:gap-2 transition-all"
                >
                  {expanded ? (
                    <>Show less <Minus size={16} /></>
                  ) : (
                    <>Read more <Plus size={16} /></>
                  )}
                </button>
              )}
            </div>

            {/* Specs Table */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl mb-6">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between p-4 bg-surface rounded-sm">
                    <div className="flex items-center gap-3">
                      <spec.icon size={18} className="text-accent" />
                      <span className="text-ink/70">{spec.label}</span>
                    </div>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl mb-6">Amenities</h2>
              <div className="flex flex-wrap gap-3">
                {property.amenities.map((amenity) => (
                  <span 
                    key={amenity}
                    className="px-4 py-2 bg-surface rounded-sm text-ink/80"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Floor Plan */}
            {property.floorPlanUrl && (
              <div className="mb-12">
                <h2 className="font-serif text-2xl mb-6">Floor Plan</h2>
                <div className="aspect-video bg-surface rounded-md overflow-hidden cursor-pointer relative group">
                  <Image
                    src={property.floorPlanUrl}
                    alt="Floor plan"
                    fill
                    className="object-contain p-8"
                  />
                </div>
              </div>
            )}

            {/* Map/Location */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl mb-6">Location</h2>
              <div className="aspect-video bg-surface rounded-md overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600"
                  alt="Map location"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <MapPin size={18} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-28 bg-surface p-8 rounded-md">
              <p className="utility-label text-accent text-2xl mb-6">
                {formatCurrency(property.price, property.currency)}
                {property.status === 'for-rent' && '/month'}
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-3 bg-bg rounded-sm">
                  <Bed className="mx-auto mb-1 text-ink/70" size={18} />
                  <span className="text-sm">{property.specs.bedrooms}</span>
                </div>
                <div className="text-center p-3 bg-bg rounded-sm">
                  <Bath className="mx-auto mb-1 text-ink/70" size={18} />
                  <span className="text-sm">{property.specs.bathrooms}</span>
                </div>
                <div className="text-center p-3 bg-bg rounded-sm">
                  <Maximize2 className="mx-auto mb-1 text-ink/70" size={18} />
                  <span className="text-sm">{property.specs.areaM2}m²</span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="w-full utility-label bg-accent text-white py-4 rounded-md hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare size={16} />
                  Request Information
                </button>
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="w-full utility-label bg-accent-secondary text-white py-4 rounded-md hover:bg-accent-secondary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone size={16} />
                  Book a Viewing
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Sticky Bottom Bar */}
          <div className="lg:hidden fixed bottom-6 left-6 right-6 bg-surface p-4 rounded-md shadow-lg z-30 flex items-center justify-between">
            <div>
              <p className="utility-label text-accent">
                {formatCurrency(property.price, property.currency)}
              </p>
              <p className="text-sm text-ink/70">{property.specs.bedrooms} beds · {property.specs.areaM2}m²</p>
            </div>
            <button
              onClick={() => setInquiryModalOpen(true)}
              className="utility-label bg-accent text-white px-6 py-3 rounded-md"
            >
              Request Info
            </button>
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <section className="bg-surface py-16">
          <div className="max-w-content mx-auto px-6 md:px-12">
            <h2 className="font-serif text-h2 mb-12">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            className="fixed inset-0 bg-ink-dark z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-md transition-colors"
              aria-label="Close lightbox"
            >
              <X size={32} />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>

            <div className="w-full max-w-5xl px-16 aspect-video relative">
              <Image
                src={property.gallery[activeImage]?.url || property.gallery[0].url}
                alt={property.gallery[activeImage]?.alt || property.gallery[0].alt}
                fill
                className="object-contain"
              />
            </div>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <span className="text-white/70 utility-label">
                {activeImage + 1} / {property.gallery.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inquiry Modal */}
      <InquiryModal 
        isOpen={inquiryModalOpen} 
        onClose={() => setInquiryModalOpen(false)} 
      />
    </div>
  );
}