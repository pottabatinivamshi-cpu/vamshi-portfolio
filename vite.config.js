import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  ssr: {
    // Bundle these into the prerender build so Node doesn't have to resolve their CJS builds
    noExternal: ['framer-motion', 'lucide-react'],
  },
})
