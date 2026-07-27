import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2f5fc',
          100: '#e1e8f9',
          200: '#bfcdf2',
          300: '#95abea',
          400: '#5579dd',
          500: '#2854cc',
          600: '#1e3f99',
          700: '#18337b',
          800: '#132862',
          900: '#0e1e48',
          950: '#0a1533',
        },
        sidebar: '#0F172A',
      },
    },
  },
  plugins: [],
};
export default config;
