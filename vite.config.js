import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    obfuscatorPlugin({
      options: {
        compact: true, // Réduit les espaces et met le code sur une ligne
        controlFlowFlattening: false, // Désactivé pour simplicité/performance
        deadCodeInjection: false, // Désactivé pour éviter code inutile
        debugProtection: false, // Pas de protection anti-debug pour simplicité
        identifierNamesGenerator: 'hexadecimal', // Noms de variables en hexadécimal (ex. : _0xabc)
        renameVariables: true, // Renomme variables/fonctions
        stringArray: true, // Encode les chaînes de caractères
        stringArrayEncoding: ['base64'], // Encode les chaînes en base64
        target: 'browser', // Optimisé pour navigateurs
      },
      // Appliquer uniquement en production (npm run build)
      apply: 'build',
      // Obfusquer les fichiers dans src/
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      // Exclure node_modules
      exclude: ['node_modules/**'],
    }),
  ],
  server: {
    watch: {
      // Ignore les gros dossiers inutiles
      ignored: ['**/node_modules/**', '**/.git/**', '**/.vite/**'],
    },
    fs: {
      // Empêche Vite de scanner hors du dossier projet
      strict: true,
      allow: ['.'] // Autoriser tout le projet
    },
  },
  build: {
    sourcemap: false, // Désactiver les source maps pour empêcher la lecture du code original
  },
});