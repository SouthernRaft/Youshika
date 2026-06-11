<template>
  <article class="article">
    <p class="eyebrow">Post</p>

    <p v-if="loading" class="hero__text">加载中…</p>
    <p v-else-if="error" class="hero__text">{{ error }}</p>

    <template v-else-if="post">
      <h1>{{ post.title }}</h1>
      <p class="article__meta">
        {{ post.category }} · {{ post.publishedAt }} · 阅读 {{ post.views }}
      </p>
      <div class="prose">
        <pre style="white-space: pre-wrap; font-family: inherit">{{ post.content }}</pre>
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
