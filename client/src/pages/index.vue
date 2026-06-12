<template>
  <section class="hero">
    <img class="hero__avatar" src="/avatar.svg" alt="优诗卡" />
    <h1 class="hero__name">优诗卡</h1>
    <p class="hero__typed">
      {{ typed }}<span class="cursor" />
    </p>

    <div class="socials">
      <a href="https://github.com/SouthernRaft" target="_blank" rel="noopener" title="GitHub">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>
      </a>
      <a href="mailto:hello@example.com" title="邮箱">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>
      </a>
      <a href="/api/posts" target="_blank" title="API">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1.5" fill="currentColor"/></svg>
      </a>
    </div>

    <div class="scroll-hint">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
    </div>
  </section>

  <section class="section">
    <div class="section__head">
      <h2>最新文章</h2>
      <RouterLink to="/archives">查看归档 →</RouterLink>
    </div>

    <p v-if="loading" class="state">加载中…</p>
    <p v-else-if="error" class="state">{{ error }}</p>

    <div v-else class="post-list">
      <PostCard v-for="post in posts" :key="post.slug" :post="post" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import PostCard from '../components/PostCard.vue'
import { fetchPosts, type PostSummary } from '../api/posts'

const posts = ref<PostSummary[]>([])
const loading = ref(true)
const error = ref('')

/* 打字机副标题 */
const phrases = ['热爱代码，也热爱生活。', '在这里记录学习与思考。', 'Vue · Node · 全栈成长中。']
const typed = ref('')
let timer: ReturnType<typeof setTimeout>

function typeLoop(pi = 0, ci = 0, deleting = false) {
  const full = phrases[pi]
  typed.value = full.slice(0, ci)
  let delay = deleting ? 50 : 110
  if (!deleting && ci === full.length) {
    delay = 1600
    timer = setTimeout(() => typeLoop(pi, ci, true), delay)
    return
  }
  if (deleting && ci === 0) {
    timer = setTimeout(() => typeLoop((pi + 1) % phrases.length, 0, false), 300)
    return
  }
  timer = setTimeout(() => typeLoop(pi, ci + (deleting ? -1 : 1), deleting), delay)
}

onMounted(async () => {
  typeLoop()
  try {
    const data = await fetchPosts()
    posts.value = data.list
  } catch (e) {
    error.value = e instanceof Error ? e.message : '加载文章失败'
  } finally {
    loading.value = false
  }
})

onUnmounted(() => clearTimeout(timer))
</script>
