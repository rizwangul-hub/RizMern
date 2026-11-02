process.env.RAYON_NUM_THREADS = '1'
process.env.UV_THREADPOOL_SIZE = '1'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
  },
})
