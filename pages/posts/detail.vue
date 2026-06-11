<template>
  <article class="article">
    <p class="eyebrow">Post</p>
    <h1>{{ title }}</h1>
    <p class="article__meta">这里后续会接入 `/api/posts/:slug` 获取文章详情。</p>
    <div class="prose">
      <p>
        这个页面是文章详情页占位。等后端文章模块完善后，可以从 MySQL 读取 Markdown 内容，
        再在服务端或前端渲染为 HTML。
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const title = computed(() => String(route.params.slug || '文章详情'))
</script>
