<template>
  <article class="post-card">
    <RouterLink class="post-card__title" :to="`/posts/${post.slug}`">
      {{ post.title }}
    </RouterLink>
    <p class="post-card__excerpt">{{ post.excerpt }}</p>
    <div class="post-card__meta">
      <span class="pill">{{ post.category }}</span>
      <span>📅 {{ formatDate(post.publishedAt) }}</span>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  post: {
    title: string
    slug: string
    excerpt: string
    category: string
    publishedAt: string
  }
}>()

function formatDate(value: string) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
</script>
