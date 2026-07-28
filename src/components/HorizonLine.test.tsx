import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HorizonLine } from './HorizonLine';
import gsap from 'gsap';

// Mock GSAP and ScrollTrigger
vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn(),
    getAll: vi.fn(() => []),
  },
}));

describe('HorizonLine Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    render(<HorizonLine />);
    
    const horizonLine = screen.getByRole('separator');
    expect(horizonLine).toBeInTheDocument();
    expect(horizonLine).toHaveClass('horizon-line');
    
    const horizonMarker = screen.getByRole('progressbar');
    expect(horizonMarker).toBeInTheDocument();
    expect(horizonMarker).toHaveClass('horizon-marker');
  });

  it('should register ScrollTrigger plugin on mount', () => {
    render(<HorizonLine />);
    expect(gsap.registerPlugin).toHaveBeenCalled();
  });

  it('should handle reduced motion preference', () => {
    // Mock prefers-reduced-motion
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    render(<HorizonLine />);
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});