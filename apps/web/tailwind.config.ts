import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // OpsBoard Brand
        primary: {
          DEFAULT: '#01696F',
          hover: '#0C4E54',
          light: '#E8F4F4',
          50: '#E8F4F4',
          100: '#C5E4E5',
          500: '#01696F',
          600: '#0C4E54',
          700: '#0A3F44',
        },
        // Surfaces
        bg: '#F7F6F2',
        surface: '#F9F8F5',
        border: '#E2E0D9',
        // Text
        ink: {
          DEFAULT: '#28251D',
          secondary: '#7A7974',
          disabled: '#B5B3AD',
        },
        // Semantic
        success: {
          DEFAULT: '#437A22',
          bg: '#EEF5E8',
          text: '#2D5217',
        },
        warning: {
          DEFAULT: '#964219',
          bg: '#F7EDE5',
          text: '#6B2E11',
        },
        danger: {
          DEFAULT: '#A12C7B',
          bg: '#F7E8F2',
          text: '#7A1F5C',
        },
      },
      fontFamily: {
        sans: ['var(--font-satoshi)', 'General Sans', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        md: '10px',
        lg: '16px',
        xl: '20px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(40, 37, 29, 0.08)',
        DEFAULT: '0 4px 12px rgba(40, 37, 29, 0.10)',
        md: '0 4px 12px rgba(40, 37, 29, 0.10)',
        lg: '0 8px 24px rgba(40, 37, 29, 0.12)',
        'inner-highlight': 'inset 0 1px 0 rgba(255,255,255,0.12)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
