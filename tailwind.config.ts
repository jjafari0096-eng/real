import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg': 'var(--color-bg)',
        'ink': 'var(--color-ink)',
        'accent': 'var(--color-accent)',
        'accent-secondary': 'var(--color-accent-secondary)',
        'surface': 'var(--color-surface)',
        'ink-inverse': 'var(--color-ink-inverse)',
        'ink-dark': 'var(--color-ink-dark)',
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
        'error': 'var(--color-error)',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Manrope', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      fontSize: {
        'h1': 'clamp(2.75rem, 6vw, 5.5rem)',
        'h2': 'clamp(2rem, 4vw, 3.5rem)',
        'body': '1.05rem',
      },
      lineHeight: {
        'body': '1.6',
      },
      maxWidth: {
        'content': '1440px',
      },
      spacing: {
        'section': 'clamp(64px, 12vw, 160px)',
      },
      borderRadius: {
        'sm': '2px',
        'md': '6px',
      },
    },
  },
  plugins: [],
}
export default config