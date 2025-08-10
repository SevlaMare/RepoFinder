import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    spacing: {
      1: '8px',
      2: '12px',
      3: '16px',
      4: '24px',
      5: '32px',
      6: '48px',
    },
    // ex lg:text-lg
    screens: {
      sm: '360px',
      md: '768px',
      lg: '992px',
      xl: '1280px',
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Karla', 'serif'],
      mono: ['Courier New', 'monospace'],
    },
    // typography
    fontSize: {
      // text-xl
      xs: ['9px', { lineHeight: '24px', letterSpacing: '-0.03em' }],
      sm: ['12px', { lineHeight: '24px', letterSpacing: '-0.03em' }],
      lg: ['14px', { lineHeight: '24px', letterSpacing: '-0.03em' }],
      xl: ['18px', { lineHeight: '24px', letterSpacing: '-0.032em' }],
      '2xl': ['36px', { lineHeight: '24px', letterSpacing: '-0.032em' }],
      '3xl': ['64px', { lineHeight: '24px', letterSpacing: '-0.032em' }],
    },
    // full overwrite
    colors: {
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      yellow: '#ffc82c',
      'gray-dark': '#273444',
      gray: '#8492a6',
      'gray-light': '#d3dce6',
      red: '#b81515',
    },
    // EXTEND -----------
    extend: {
      borderRadius: {
        '2xl': '2rem',
      },
      keyframes: {
        rollIn: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(100%, 0, 0) rotate3d(0, 0, 1, 200deg)',
          },
          '20%': {
            transform: 'translate3d(75%, 0, 0) rotate3d(0, 0, 1, 150deg)',
          },
          '40%': {
            opacity: '1',
            transform: 'translate3d(-10%, 0, 0) rotate3d(0, 0, 1, -30deg)',
          },
          '60%': {
            transform: 'translate3d(5%, 0, 0) rotate3d(0, 0, 1, 15deg)',
          },
          '100%': { transform: 'none' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        rushIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'unset' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        zoomInAndOut: {
          '0%': { transform: 'scale(1)' },
          '20%': {
            transform: 'scale(1.02)',
            boxShadow: '4px 4px 8px 4px rgba(0, 0, 0, 0.1)',
          },
          '80%': {
            transform: 'scale(1.02)',
            boxShadow: '4px 4px 8px 4px rgba(0, 0, 0, 0.1)',
          },
          '100%': { transform: 'scale(1)' },
        },
        swing: {
          '0%': { transform: 'rotate3d(0, 0, 1, 0deg)' },
          '20%': { transform: 'rotate3d(0, 0, 1, -5deg)' },
          '30%': { transform: 'rotate3d(0, 0, 1, -7deg)' },
          '50%': { transform: 'rotate3d(0, 0, 1, -10deg)' },
          '60%': { transform: 'rotate3d(0, 0, 1, 15deg)' },
          '70%': { transform: 'rotate3d(0, 0, 1, -10deg)' },
          '80%': { transform: 'rotate3d(0, 0, 1, 5deg)' },
          '90%': { transform: 'rotate3d(0, 0, 1, -2deg)' },
          '100%': { transform: 'rotate3d(0, 0, 1, 0deg)' },
        },
        tilt: {
          '0%': { transform: 'rotate3d(0, 0, 1, 0deg)' },
          '15%': { transform: 'rotate3d(0, 0, 1, -100deg)' },
          '100%': { transform: 'rotate3d(0, 0, 1, -100deg)' },
        },
        letGo: {
          '0%': { transform: 'rotate3d(0, 0, 1, -100deg)' },
          '20%': { transform: 'rotate3d(0, 0, 1, 60deg)' },
          '40%': { transform: 'rotate3d(0, 0, 1, -40deg)' },
          '60%': { transform: 'rotate3d(0, 0, 1, 20deg)' },
          '80%': { transform: 'rotate3d(0, 0, 1, -10deg)' },
          '100%': { transform: 'rotate3d(0, 0, 1, 0deg)' },
        },
        blinking: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        implode: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0)' },
        },
      },
      animation: {
        rollIn: 'rollIn 0.8s ease-in',
        fadeIn: 'fadeIn 0.1s ease-out',
        rushIn: 'rushIn 0.1s ease-out',
        slideIn: 'slideIn 0.2s ease-out',
        slideInRight: 'slideInRight 0.2s ease-out',
        zoomInAndOut: 'zoomInAndOut 0.6s ease-out forwards',
        swing: 'swing 1.2s ease-out forwards',
        tilt: 'tilt 1s ease-out forwards',
        letGo: 'letGo 1s ease-out forwards',
        blinking: 'blinking 1s ease-out infinite',
        implode: 'implode 0.2s ease-out forwards',
      },
    },
  },
  plugins: [],
  // corePlugins: { container: false },
} satisfies Config;
