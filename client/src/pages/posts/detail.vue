<template>
  <article class="article">
    <p class="eyebrow">Post</p>

    <p v-if="loading" class="state">加载中…</p>
    <p v-else-if="error" class="state">{{ error }}</p>

    <template v-else-if="post">
      <h1>{{ post.title }}</h1>
      <p class="article__meta">
        <span class="pill">{{ post.category }}</span>
        <span>📅 {{ formatDate(post.publishedAt) }}</span>
        <span>👁 {{ post.views }} 次阅读</span>
      </p>
      <div class="prose">
        <pre>{{ post.content }}</pre>
      </div>
    </template>
  </article>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPost, type PostDetail } from '../../api/posts'

const route = useRoute()
const post = ref<PostDetail | null>(null)
const loading = ref(true)
const error = ref('')

function formatDate(value: string) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

async function load(slug: string) {
  loading.value = true
  error.value = ''
  try {
    post.value = await fetchPost(slug)
  } catch (e) {
    error.value = e instanceof Error ? e.message : '加载文章失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => load(String(route.params.slug)))
watch(() => route.params.slug, (slug) => slug && load(String(slug)))
</script>
