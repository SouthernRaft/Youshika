<template>
  <article class="post-card">
    <RouterLink class="post-card__title" :to="`/posts/${post.slug}`">
      {{ post.title }}
    </RouterLink>
    <p class="post-card__excerpt">{{ post.excerpt }}</p>
    <div class="post-card__meta">
      <span>{{ post.category }}</span>
      <span>{{ post.publishedAt }}</span>
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
</script>
