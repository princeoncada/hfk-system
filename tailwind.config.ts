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
        paper: '#FFFDF8',
        cream: '#F7F2E8',
        'cream-deep': '#EFE8D8',
        ink: '#2A1F18',
        'ink-2': '#5C4033',
        'ink-3': '#8A7264',
        'ink-4': '#B8A89A',
        sage: '#6F8F63',
        'sage-deep': '#4F6D44',
        'sage-tint': '#DDE7D5',
        rose: '#C77769',
        'rose-tint': '#F2DCD6',
        yellow: '#E8C75B',
        'yellow-tint': '#F6E9B8',
        'play-sky': '#4A90D9',
        'play-sky-light': '#D6EAF8',
        'warm-brown': '#5C4033',
        'sage-green': '#87A878',
        'dusty-rose': '#D4897A',
        'soft-yellow': '#F5E6A3',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
        'playful-heading': ['var(--font-fredoka)', 'sans-serif'],
        'playful-body': ['var(--font-nunito)', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 0 rgba(92,64,51,0.04), 0 1px 3px rgba(92,64,51,0.06)',
        lift: '0 4px 14px rgba(92,64,51,0.08), 0 1px 2px rgba(92,64,51,0.06)',
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        lg: '14px',
        xl: '20px',
        card: '14px',
      },
    },
  },
  plugins: [],
}

export default config
