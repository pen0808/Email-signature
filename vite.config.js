import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
  },
  base: process.env.VITE_BASE_PATH || '/Email-signature',
})
