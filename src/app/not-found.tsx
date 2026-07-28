'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    console.error('404 - Page not found');
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ink-dark text-white">
      <h1 className="font-serif text-6xl mb-4">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-accent rounded-full hover:opacity-90 transition-opacity"
      >
        Back to Home
      </Link>
    </div>
  );
}