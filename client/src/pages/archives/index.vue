<template>
  <section class="page">
    <div class="page__card">
      <p class="eyebrow">Archives</p>
      <h1>文章归档</h1>

      <p v-if="loading" class="state">加载中…</p>
      <p v-else-if="error" class="state">{{ error }}</p>

      <ul v-else class="timeline">
        <li v-for="post in posts" :key="post.slug">
          <time>{{ formatDate(post.publishedAt) }}</time>
          <RouterLink :to="`/posts/${post.slug}`">{{ post.title }}</RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchPosts, type PostSummary } from '../../api/posts'

const posts = ref<PostSummary[]>([])
const loading = ref(true)
const error = ref('')

function formatDate(value: string) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

onMounted(async () => {
  try {
    posts.value = (await fetchPosts()).list
  } catch (e) {
    error.value = e instanceof Error ? e.message : '加载失败'
  } finally {
    loading.value = false
  }
})
</script>
