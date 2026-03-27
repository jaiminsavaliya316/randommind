/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      include: ['src/**/*.{js,jsx}'],
      exclude: [
        'src/test/**',
        'src/main.jsx',
        'src/data/**',
        'src/services/aiService.js',
        'src/services/logger.js',
      ],
    },
  },
  server: {
    proxy: {
      "/nvidia-api": {
        target: "https://integrate.api.nvidia.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nvidia-api/, ""),
      },
    },
  },
})
