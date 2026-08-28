import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Repo is served from https://amrutharaga.github.io/My-Portfolio/
// If you rename the repo, change BASE to '/<new-repo-name>/'.
// For a user page (amrutharaga.github.io), set BASE to '/'.
const BASE = '/My-Portfolio/'

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1200,
  },
})
