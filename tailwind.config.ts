import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F1F3F6',
          2: '#E9ECF1',
          3: '#DFE3EA',
        },
        'bg-paper': '#F1F3F6',
        'bg-paper-2': '#E9ECF1',
        'bg-paper-3': '#DFE3EA',
        'bg-ink': '#0B0B0D',
        'bg-ink-2': '#14141A',
        'bg-ink-3': '#1D1D26',
        ink: {
          DEFAULT: '#0B0B0D',
          2: '#14141A',
          900: '#0B0B0D',
          700: '#2D2D33',
          500: '#5A5A63',
          400: '#7A7A82',
          300: '#9A9AA3',
          200: '#BFBFC5',
          100: '#D6D6DC',
          50: '#ECECEF',
        },
        'brand-navy': {
          DEFAULT: '#1A2750',
          2: '#243769',
          3: '#0F1A38',
        },
        'brand-blue': '#3B5FE8',
        'brand-violet': {
          DEFAULT: '#7C3AED',
          deep: '#5B21B6',
        },
        'brand-violet-deep': '#5B21B6',
        accent: {
          tech: {
            DEFAULT: '#2D5BFF',
            2: '#4A72FF',
          },
          brass: {
            DEFAULT: '#B8935F',
            2: '#9A7A4A',
          },
        },
        'accent-tech': '#2D5BFF',
        'accent-brass': '#B8935F',
        suite: {
          build: '#06B6D4',
          legal: '#D4A521',
          fish: '#8B5CF6',
          food: '#F59E0B',
          retail: '#EC4899',
          dental: '#14B8A6',
          tech: '#6366F1',
          'legal-pa': '#3B82F6',
          pet: '#F97316',
        },
        success: '#1F7A4C',
        warning: '#B8860B',
        danger: '#A8322B',
        line: 'rgba(11,11,13,0.08)',
        'line-strong': 'rgba(11,11,13,0.16)',
        'line-ink': 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        serif: ['var(--font-instrument-serif)', 'Times New Roman', 'serif'],
        sans: ['var(--font-inter-tight)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display-xl': ['96px', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['72px', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-md': ['64px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['48px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'heading-lg': ['36px', { lineHeight: '1.15' }],
        'heading-md': ['28px', { lineHeight: '1.15' }],
        'body-lg': ['20px', { lineHeight: '1.6' }],
        'body': ['17px', { lineHeight: '1.6' }],
        'small': ['14px', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'label': ['12px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },
      animation: {
        'reveal': 'reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'typing': 'typing 1.5s ease-in-out infinite',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        typing: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'material': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
