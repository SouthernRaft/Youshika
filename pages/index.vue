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

    <div class="post-list">
      <PostCard v-for="post in posts" :key="post.slug" :post="post" />
    </div>
  </section>
</template>

<script setup lang="ts">
import PostCard from '../components/PostCard.vue'

const posts = [
  {
    title: '新的开始',
    slug: 'hello-youshika',
    excerpt: '从静态博客思路出发，重新搭建一个更自由的全栈博客项目。',
    category: '随笔',
    publishedAt: '2026-06-11',
  },
  {
    title: '为什么选择 Vue 3 + Vite',
    slug: 'vue-vite-stack',
    excerpt: '保持前端轻快，后端独立演进，适合个人项目长期维护。',
    category: '技术',
    publishedAt: '2026-06-11',
  },
]
</script>
