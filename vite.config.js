import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Relative base makes the build portable for subpaths (e.g., GitHub Pages) and file hosting.
  base: "./",
  plugins: [react()],
})
