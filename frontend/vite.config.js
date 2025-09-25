// frontend/vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],

  // Alias pour imports depuis src
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  server: {
    port: 5173, // port frontend
    proxy: {
      // Toute requête commençant par /api sera redirigée vers le backend
      '/api': {
        target: 'http://localhost:3000', // backend Node.js
        changeOrigin: true,
        secure: false
      }
    }
  }
})
