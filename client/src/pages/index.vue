<template>
  <section class="hero">
    <p class="eyebrow">Personal Blog</p>
    <h1>优诗卡的博客</h1>
    <p class="hero__text">
      一个参考 SouthernRaft 目录气质重建的全栈个人博客，用 Vue 3、Vite、Node.js、MySQL 和 Redis 组织。
    </p>
  </section>

  <section class="section">
    <div class="section__head">
      <h2>最新文章</h2>
      <RouterLink to="/archives">查看归档</RouterLink>
    </div>

    <p v-if="loading" class="hero__text">加载中…</p>
    <p v-else-if="error" class="hero__text">{{ error }}（后端或数据库未启动时会这样，先运行 pnpm db:up 和 pnpm dev）</p>

    <div v-else class="post-list">
      <PostCard v-for="post in posts" :key="post.slug" :post="post" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PostCard from '../components/PostCard.vue'
import { fetchPosts, type PostSummary } from '../api/posts'

const posts = ref<PostSummary[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const data = await fetchPosts()
    posts.value = data.list
  } catch (e) {
    error.value = e instanceof Error ? e.message : '加载文章失败'
  } finally {
    loading.value = false
  }
})
</script>
