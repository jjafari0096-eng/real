'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ink-dark text-white">
      <h1 className="font-serif text-5xl mb-4">خطایی رخ داد</h1>
      <p className="text-lg mb-8 opacity-80">{error.message || 'متاسفانه مشکلی پیش آمده'}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-accent rounded-full hover:opacity-90 transition-opacity"
      >
        تلاش مجدد
      </button>
    </div>
  );
}