import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'shahine-portofolio'
const base = process.env.GITHUB_ACTIONS === 'true' ? `/${repositoryName}/` : '/'

export default defineConfig({
  base,
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
