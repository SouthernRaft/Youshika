<template>
  <div class="site-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/">优诗卡</RouterLink>
      <nav class="nav">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/archives">归档</RouterLink>
        <RouterLink to="/tags">标签</RouterLink>
        <RouterLink to="/about">关于</RouterLink>
        <RouterLink to="/admin">后台</RouterLink>
      </nav>
    </header>

    <main class="site-main">
      <slot />
    </main>

    <footer class="site-footer">
      <span>Youshika Blog</span>
      <span>Vue 3 + Vite + Express</span>
    </footer>
  </div>
</template>
