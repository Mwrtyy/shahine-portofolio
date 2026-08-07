import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('/three/') || id.includes('/three-stdlib/')) return 'three-core'
          if (id.includes('/@react-three/')) return 'react-three'
          if (id.includes('/react/') || id.includes('/react-dom/')) return 'react-vendor'
          return undefined
        },
      },
    },
  },
})
