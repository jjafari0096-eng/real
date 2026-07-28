import { describe, it, expect, vi } from 'vitest';
import { formatCurrency, debounce, cn } from './utils';

describe('Utility Functions', () => {
  describe('cn (class merging)', () => {
    it('should merge tailwind classes correctly', () => {
      const result = cn('bg-red-500', 'text-white', 'p-4');
      expect(result).toBe('bg-red-500 text-white p-4');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const result = cn('base-class', isActive && 'active-class', !isActive && 'inactive-class');
      expect(result).toBe('base-class active-class');
    });

    it('should resolve tailwind conflicts properly', () => {
      const result = cn('bg-red-500', 'bg-blue-500');
      expect(result).toBe('bg-blue-500');
    });
  });

  describe('formatCurrency', () => {
    it('should format USD correctly', () => {
      const result = formatCurrency(1000000, 'USD');
      expect(result).toBe('$1,000,000');
    });

    it('should format EUR correctly', () => {
      const result = formatCurrency(500000, 'EUR');
      expect(result).toBe('€500,000');
    });

    it('should format GBP correctly', () => {
      const result = formatCurrency(750000, 'GBP');
      expect(result).toBe('£750,000');
    });

    it('should handle zero values', () => {
      const result = formatCurrency(0, 'USD');
      expect(result).toBe('$0');
    });

    it('should handle large numbers', () => {
      const result = formatCurrency(100000000, 'USD');
      expect(result).toBe('$100,000,000');
    });
  });

  describe('debounce', () => {
    it('should debounce function calls', async () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);
      
      debouncedFn();
      debouncedFn();
      debouncedFn();
      
      expect(mockFn).not.toHaveBeenCalled();
      
      await new Promise(resolve => setTimeout(resolve, 150));
      
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should pass arguments to the debounced function', async () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);
      
      debouncedFn('test', 123);
      
      await new Promise(resolve => setTimeout(resolve, 150));
      
      expect(mockFn).toHaveBeenCalledWith('test', 123);
    });
  });
});