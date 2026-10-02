import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/React/task3/',
  build: {
    outDir: '../dist/task3',
    emptyOutDir: false,
  },
})