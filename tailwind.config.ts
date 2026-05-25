import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#070707',
        panel: '#111111',
        red: '#FF2A2A',
        glow: '#7A0000',
        text: '#F5F5F5',
        muted: '#9B9B9B'
      },
      boxShadow: {
        redGlow: '0 0 40px rgba(255,42,42,0.22)',
        softGlass: '0 24px 80px rgba(0,0,0,0.45)'
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at 20% 20%, rgba(255,42,42,0.24), transparent 28%), radial-gradient(circle at 80% 0%, rgba(122,0,0,0.28), transparent 30%), radial-gradient(circle at 50% 100%, rgba(255,255,255,0.05), transparent 25%)'
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif']
      },
      animation: {
        floatSlow: 'floatSlow 8s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        drift: 'drift 18s linear infinite'
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-14px,0)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(0.94)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' }
        },
        drift: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(120px,-60px,0)' }
        }
      }
    }
  },
  plugins: []
};

export default config;