/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: {
          DEFAULT: '#0a0a0a',
          secondary: '#f8f9fa',
          tertiary: '#f1f3f4',
          elevated: '#ffffff'
        },
        border: {
          subtle: '#e5e7eb',
          DEFAULT: '#d1d5db',
          strong: '#9ca3af'
        },
        accent: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
          muted: '#1d4ed8'
        }
      },
      spacing: {
        'card': 'var(--spacing-card)',
        'card-sm': 'var(--spacing-card-sm)',
        'card-lg': 'var(--spacing-card-lg)',
        'section': 'var(--spacing-section)',
        'container': 'var(--spacing-container)',
      },
      padding: {
        'card': 'var(--padding-card)',
        'card-sm': 'var(--padding-card-sm)',
        'card-lg': 'var(--padding-card-lg)',
      },
      gap: {
        'card': 'var(--gap-card)',
        'card-sm': 'var(--gap-card-sm)',
        'card-lg': 'var(--gap-card-lg)',
      },
      borderRadius: {
        'project': 'var(--project-radius)',
        'card': 'var(--radius-card)',
        'card-sm': 'var(--radius-card-sm)',
        'card-lg': 'var(--radius-card-lg)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
