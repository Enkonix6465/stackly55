import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,  // 👈 this will auto open browser
    port: 5173,
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'i18n-vendor': ['i18next', 'react-i18next'],
          'ui-vendor': ['lucide-react', 'framer-motion']
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1000 kB
  }
})
