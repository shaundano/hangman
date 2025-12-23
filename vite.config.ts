import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'hangman' with your exact repository name if different
export default defineConfig({
  plugins: [react()],
  base: '/hangman/', 
})