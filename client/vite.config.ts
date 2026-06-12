import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// /api 代理目标：本机开发时是 localhost:3001；在 Docker 里由 VITE_API_PROXY 指向后端容器 http://api:3001
const apiTarget = process.env.VITE_API_PROXY || 'http://localhost:3001'
// 在 Docker（尤其 Windows 挂载卷）里需要轮询才能监测到文件改动 → 热更新
const usePolling = process.env.DOCKER === 'true'

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
    host: true, // 监听 0.0.0.0，容器外/局域网才能访问
    port: 5173,
    proxy: {
      // 前端 /api 的请求转发到后端
      '/api': apiTarget,
    },
    watch: usePolling ? { usePolling: true } : undefined,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
