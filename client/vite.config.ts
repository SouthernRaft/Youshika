import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// 注意：以仓库根目录运行 `vite client` 时，root 即本文件所在的 client/ 目录。
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // '@' 指向 client/src
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // 前端 /api 的请求转发到后端 Express（3001）
      '/api': 'http://localhost:3001',
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
