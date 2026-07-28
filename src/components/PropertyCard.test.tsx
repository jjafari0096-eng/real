import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyCard } from './PropertyCard';
import type { Property } from '@/types/property';

const mockProperty: Property = {
  id: '1',
  slug: 'luxury-villa-los-angeles',
  title: 'Luxury Villa in Los Angeles',
  description: 'Beautiful luxury villa with amazing views',
  price: 2500000,
  currency: 'USD',
  propertyType: 'villa',
  status: 'for-sale',
  bedrooms: 5,
  bathrooms: 4,
  area: 4500,
  location: {
    city: 'Los Angeles',
    country: 'USA',
    address: '123 Hollywood Blvd',
  },
  gallery: [
    {
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      alt: 'Villa exterior',
    },
  ],
  features: ['pool', 'garage', 'garden'],
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
};

describe('PropertyCard Component', () => {
  it('should render property information correctly', () => {
    render(<PropertyCard property={mockProperty} />);
    
    // Check title
    expect(screen.getByText('Luxury Villa in Los Angeles')).toBeInTheDocument();
    
    // Check location
    expect(screen.getByText('Los Angeles, USA')).toBeInTheDocument();
    
    // Check specs
    expect(screen.getByText('5')).toBeInTheDocument(); // bedrooms
    expect(screen.getByText('4')).toBeInTheDocument(); // bathrooms
    expect(screen.getByText('4,500 sqft')).toBeInTheDocument(); // area
    
    // Check price formatting
    expect(screen.getByText('$2,500,000')).toBeInTheDocument();
  });

  it('should toggle favorite state when heart icon is clicked', () => {
    render(<PropertyCard property={mockProperty} />);
    
    const heartButton = screen.getByRole('button', { name: /add to favorites/i });
    expect(heartButton).toBeInTheDocument();
    
    // Initially not filled
    expect(heartButton.querySelector('svg')).not.toHaveClass('fill-red-500');
    
    // Click to toggle
    fireEvent.click(heartButton);
    
    // Should be filled now
    expect(heartButton.querySelector('svg')).toHaveClass('fill-red-500');
  });

  it('should display all property icons correctly', () => {
    render(<PropertyCard property={mockProperty} />);
    
    // Check if all icons are present
    expect(screen.getByRole('img', { name: /bed/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /bath/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /maximize/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /map pin/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /heart/i })).toBeInTheDocument();
  });

  it('should handle image load state', () => {
    render(<PropertyCard property={mockProperty} />);
    
    const image = screen.getByAltText('Villa exterior');
    expect(image).toBeInTheDocument();
    
    // Simulate image load
    fireEvent.load(image);
  });
});