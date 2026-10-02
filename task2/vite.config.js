import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/React/task2/',        // Путь для GitHub Pages
  build: {
    outDir: '../dist/task2',    // Складываем билд в общую папку dist/task2
    emptyOutDir: false,         // Не очищаем общую папку при сборке
  },
})