import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // ou '/nom-du-repo/' si tu déploies sur GitHub Pages
  build: {
    sourcemap: true, // utile pour debugger en prod
    outDir: 'dist',  // dossier de sortie
    emptyOutDir: true,
  },
})