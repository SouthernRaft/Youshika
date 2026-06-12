<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="site-header__inner">
        <RouterLink class="brand" to="/">
          <span class="brand__dot" />
          优诗卡
        </RouterLink>

        <nav class="nav">
          <RouterLink to="/">首页</RouterLink>
          <RouterLink to="/archives">归档</RouterLink>
          <RouterLink to="/tags">标签</RouterLink>
          <RouterLink to="/about">关于</RouterLink>
          <RouterLink to="/admin">后台</RouterLink>
          <button class="theme-toggle" :title="isDark ? '切换到亮色' : '切换到暗色'" @click="toggleTheme">
            <!-- 月亮 / 太阳 图标 -->
            <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          </button>
        </nav>
      </div>
    </header>

    <main class="site-main">
      <slot />
    </main>

    <footer class="site-footer">
      <p>© 2026 优诗卡 · Made with <span class="heart">♥</span> &amp; Vue 3</p>
      <p>Vue 3 · Vite · Express · MySQL · Redis · Docker</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const isDark = ref(false)

function apply(dark: boolean) {
  isDark.value = dark
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem('theme', dark ? 'dark' : 'light')
}

function toggleTheme() {
  apply(!isDark.value)
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  apply(saved ? saved === 'dark' : prefersDark)
})
</script>
