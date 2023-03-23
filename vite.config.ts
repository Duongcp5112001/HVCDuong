import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true
  },
  build: {
    chunkSizeWarningLimit: 100000000
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@stories', replacement: path.resolve(__dirname, './src/stories') },
      { find: '@stores', replacement: path.resolve(__dirname, './src/stores') },
      { find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
      { find: '@components', replacement: path.resolve(__dirname, './src/components') },
      { find: '@pages', replacement: path.resolve(__dirname, './src/pages') },
      { find: '@assets', replacement: path.resolve(__dirname, './src/assets') },
      { find: '@openapi', replacement: path.resolve(__dirname, './src/openapi') },
    ]
  }
})