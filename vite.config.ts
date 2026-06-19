import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// `base` is set for GitHub Pages project site (served from /poland-kz/).
// Dev server stays at root for convenience.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/poland-kz/' : '/',
  plugins: [react(), tailwindcss()],
}))
