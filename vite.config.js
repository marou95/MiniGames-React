import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    watch: {
      // Ignore les gros dossiers inutiles
      ignored: ['**/node_modules/**', '**/.git/**', '**/.vite/**'],
    },
    fs: {
      // Empêche Vite de scanner hors du dossier projet
      strict: true,
      allow: ['.'] // ou ['.'] si tu veux autoriser tout le projet
    }
  }
});
