import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative assets work on GitHub Pages, Vercel, Netlify, and custom domains
  server: {
    port: 3000,
    open: true
  }
});
