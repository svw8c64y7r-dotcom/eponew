/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#060911",
          card: "#0d1322",
          cardHover: "#131b30",
          border: "#1e293b",
          borderGlow: "#00f0ff33",
          cyan: "#00f0ff",
          blue: "#3b82f6",
          purple: "#8b5cf6",
          emerald: "#10b981",
          amber: "#f59e0b",
          red: "#ef4444",
          text: "#f8fafc",
          muted: "#94a3b8"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'cyber-cyan': '0 0 25px -5px rgba(0, 240, 255, 0.3)',
        'cyber-blue': '0 0 25px -5px rgba(59, 130, 246, 0.3)',
        'cyber-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      backgroundImage: {
        'cyber-gradient': 'radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.15) 0%, rgba(9, 14, 27, 0) 70%)',
        'grid-pattern': "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)"
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow 3s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(0, 240, 255, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 240, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
