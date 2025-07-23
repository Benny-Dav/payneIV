import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'framer': ['framer-motion']
        }
      }
    },
    cssCodeSplit: true,
    minify: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1500
  }
})
