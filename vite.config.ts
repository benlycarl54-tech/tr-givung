import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  preview: {
    allowedHosts: ['.onrender.com'], // Add your Render domain
    port: 10000, // Optional: Render uses port 10000 by default
    host: true, // Listen on all addresses
  },
  server: {
    host: true, // Also for dev server if needed
  }
})
