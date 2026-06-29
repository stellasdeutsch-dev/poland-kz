import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Base path differs per host:
//   - GitHub Pages serves from a sub-path /poland-kz/ → the Actions workflow
//     sets GITHUB_PAGES=true so the build uses that base.
//   - Cloudflare Pages (and the dev server) serve from the domain root → base '/'.
export default defineConfig(({ command }) => ({
  base: command === 'build' && process.env.GITHUB_PAGES ? '/poland-kz/' : '/',
  plugins: [react(), tailwindcss()],
}))
