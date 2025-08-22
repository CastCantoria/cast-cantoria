import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // '/' pour Vercel, './' ou '/nom-du-repo/' pour GitHub Pages
  build: {
    sourcemap: true,       // utile pour debugger en prod
    outDir: 'dist',        // dossier de sortie
    emptyOutDir: true,     // nettoie le dossier avant build
  },
  server: {
    // Utile en local pour simuler le comportement SPA
    historyApiFallback: true
  }
})