import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Force Vite to open the page in Google Chrome
process.env.BROWSER = 'chrome'

export default defineConfig({
  plugins: [react()],
  base: '/Enjoy_Cooking/',
  server: {
    open: true
  }
})
