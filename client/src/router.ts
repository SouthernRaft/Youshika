import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/index.vue'
import AboutPage from './pages/about/index.vue'
import ArchivesPage from './pages/archives/index.vue'
import TagsPage from './pages/tags/index.vue'
import PostDetailPage from './pages/posts/detail.vue'
import AdminPage from './pages/admin/index.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/posts/:slug', name: 'post-detail', component: PostDetailPage },
    { path: '/archives', name: 'archives', component: ArchivesPage },
    { path: '/tags', name: 'tags', component: TagsPage },
    { path: '/about', name: 'about', component: AboutPage },
    { path: '/admin', name: 'admin', component: AdminPage },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})
