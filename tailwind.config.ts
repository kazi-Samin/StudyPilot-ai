import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#004ac6",
        "primary-container": "#2563eb",
        "on-primary": "#ffffff",
        "on-primary-container": "#eeefff",
        secondary: "#006b5f",
        "secondary-container": "#6df5e1",
        tertiary: "#8e3c00",
        surface: "#faf8ff",
        "surface-container": "#eaedff",
        "surface-container-low": "#f2f3ff",
        "surface-container-high": "#e2e7ff",
        "on-surface": "#131b2e",
        "on-surface-variant": "#434655",
        outline: "#737686",
        "outline-variant": "#c3c6d7",
        error: "#ba1a1a",
        background: "#faf8ff",
        "inverse-surface": "#283044",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '20px',
      }
    },
  },
  plugins: [],
} satisfies Config
