'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { properties } from '@/data/properties';
import { PropertyCard } from '@/components/PropertyCard';
import { Property } from '@/types/property';
import { Search, Grid3X3, Map, SlidersHorizontal, X } from 'lucide-react';

export default function ListingsPage() {
  // Filter states
  const [propertyType, setPropertyType] = useState<string>('all');
  const [status, setStatus] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(50000000);
  const [minBedrooms, setMinBedrooms] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Get all unique regions for filter
  const allRegions = [...new Set(properties.map(p => p.location.region))];

  // Filter properties based on all criteria
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Property type filter
      if (propertyType !== 'all' && property.type !== propertyType) return false;
      
      // Status filter
      if (status !== 'all' && property.status !== status) return false;
      
      // Price filter - converted to EUR for comparison
      const priceInEUR = property.currency === 'USD' ? property.price * 0.92 : 
                         property.currency === 'GBP' ? property.price * 1.17 :
                         property.currency === 'JPY' ? property.price * 0.0063 :
                         property.currency === 'SEK' ? property.price * 0.087 :
                         property.currency === 'CAD' ? property.price * 0.68 :
                         property.currency === 'AED' ? property.price * 0.27 :
                         property.price;
      if (priceInEUR > maxPrice) return false;
      
      // Bedrooms filter
      if (minBedrooms > 0 && property.specs.bedrooms < minBedrooms) return false;
      
      // Search query filter (location or title)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          property.title.toLowerCase().includes(query) ||
          property.location.city.toLowerCase().includes(query) ||
          property.location.region.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }
      
      return true;
    });
  }, [propertyType, status, maxPrice, minBedrooms, searchQuery]);

  // Reset all filters
  const resetFilters = () => {
    setPropertyType('all');
    setStatus('all');
    setMaxPrice(50000000);
    setMinBedrooms(0);
    setSearchQuery('');
  };

  const typeOptions = ['all', 'villa', 'apartment', 'penthouse', 'commercial'];
  const statusOptions = ['all', 'for-sale', 'for-rent', 'sold'];
  const bedroomOptions = [0, 1, 2, 3, 4, 5];

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-bg">
      {/* Page Header */}
      <div className="max-w-content mx-auto px-6 md:px-12 py-10">
        <h1 className="font-serif text-h2 mb-3">Find Your Property</h1>
        <p className="text-ink/70 text-lg mb-8">Browse {filteredProperties.length} exceptional properties worldwide</p>
        
        {/* Search and View Toggle Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/50" size={20} />
            <input
              type="text"
              placeholder="Search by city, region, or property name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface border border-ink/10 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/50 hover:text-ink"
              >
                <X size={18} />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-md border transition-colors ${
                showFilters ? 'bg-accent text-white border-accent' : 'bg-surface border-ink/10 hover:border-accent/50'
              }`}
            >
              <SlidersHorizontal size={18} />
              <span className="utility-label text-xs">Filters</span>
            </button>
            
            <div className="flex bg-surface rounded-md overflow-hidden border border-ink/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-accent text-white' : 'hover:bg-ink/5'}`}
                aria-label="Grid view"
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-3 transition-colors ${viewMode === 'map' ? 'bg-accent text-white' : 'hover:bg-ink/5'}`}
                aria-label="Map view"
              >
                <Map size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-10"
            >
              <div className="bg-surface p-6 md:p-8 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Property Type Filter */}
                <div>
                  <label className="block utility-label text-xs mb-3 text-ink/80">Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-ink/10 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    {typeOptions.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block utility-label text-xs mb-3 text-ink/80">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-ink/10 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    {statusOptions.map(s => (
                      <option key={s} value={s}>
                        {s === 'all' ? 'All Status' : s.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Min Bedrooms Filter */}
                <div>
                  <label className="block utility-label text-xs mb-3 text-ink/80">Minimum Bedrooms: {minBedrooms || 'Any'}</label>
                  <select
                    value={minBedrooms}
                    onChange={(e) => setMinBedrooms(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white border border-ink/10 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    {bedroomOptions.map(num => (
                      <option key={num} value={num}>
                        {num === 0 ? 'Any bedrooms' : num === 1 ? '1+ bedroom' : `${num}+ bedrooms`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Max Price Filter */}
                <div>
                  <label className="block utility-label text-xs mb-3 text-ink/80">Max Price (EUR): €{maxPrice.toLocaleString()}</label>
                  <input
                    type="range"
                    min="500000"
                    max="50000000"
                    step="500000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full mt-4 accent-accent"
                  />
                </div>

                <div className="lg:col-span-4 flex justify-end">
                  <button
                    onClick={resetFilters}
                    className="utility-label text-ink/70 hover:text-ink underline"
                  >
                    Reset all filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Properties Grid */}
      <div className="max-w-content mx-auto px-6 md:px-12 pb-20">
        {filteredProperties.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            layout
          >
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-surface rounded-md">
            <h3 className="font-serif text-3xl mb-4">No properties found</h3>
            <p className="text-ink/70 mb-8 max-w-md mx-auto">We couldn't find any properties matching your criteria. Try adjusting your filters to see more results.</p>
            <button
              onClick={resetFilters}
              className="utility-label bg-accent text-white px-8 py-4 rounded-md hover:bg-accent/90 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}