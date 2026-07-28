'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Property } from '@/types/property';
import { Heart, Bed, Bath, Maximize2, MapPin } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Use the first two images from the gallery for crossfade effect
  const primaryImage = property.gallery[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800';
  const secondaryImage = property.gallery[1]?.url || primaryImage;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <motion.div 
      variants={cardVariants}
      className="group"
    >
      <Link href={`/properties/${property.slug}`} className="block">
        <div className="relative overflow-hidden rounded-md mb-4 aspect-[4/3] bg-surface">
          {/* Primary image */}
          <img
            src={primaryImage}
            alt={property.title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0 opacity-100"
          />
          
          {/* Secondary image that appears on hover */}
          <img
            src={secondaryImage}
            alt={`${property.title} - second view`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
          
          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <motion.div
              animate={{ scale: isFavorite ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart 
                size={18} 
                className={isFavorite ? 'fill-red-500 text-red-500' : 'text-ink'} 
              />
            </motion.div>
          </button>
          
          {/* Status badge */}
          <div className="absolute top-4 left-4">
            <span className={`utility-label text-xs px-3 py-1.5 rounded-sm text-white ${
              property.status === 'for-sale' ? 'bg-accent-secondary' : 
              property.status === 'for-rent' ? 'bg-accent' : 'bg-ink/70'
            }`}>
              {property.status.replace('-', ' ')}
            </span>
          </div>
          
          {/* Image zoom effect on hover */}
          <div className="absolute inset-0 scale-100 group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-serif text-xl text-ink group-hover:text-accent transition-colors">
              {property.title}
            </h3>
          </div>
          
          <p className="text-ink/60 flex items-center gap-1.5">
            <MapPin size={14} />
            {property.location.city}, {property.location.region}
          </p>
          
          <p className="utility-label text-accent text-lg mt-2">
            {formatCurrency(property.price, property.currency)}
            {property.status === 'for-rent' && '/month'}
          </p>
          
          {/* Property specs */}
          <div className="flex gap-5 pt-3 mt-3 border-t border-ink/10">
            {property.specs.bedrooms > 0 && (
              <span className="flex items-center gap-1.5 text-ink/70 text-sm">
                <Bed size={16} />
                {property.specs.bedrooms}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-ink/70 text-sm">
              <Bath size={16} />
              {property.specs.bathrooms}
            </span>
            <span className="flex items-center gap-1.5 text-ink/70 text-sm">
              <Maximize2 size={16} />
              {property.specs.areaM2}m²
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}