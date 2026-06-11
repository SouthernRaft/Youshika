// 前端访问后端文章接口的封装。
// 开发环境下 vite 会把 /api 代理到 http://localhost:3001 （见 vite.config.ts）。

export interface PostSummary {
  id: number
  title: string
  slug: string
  excerpt: string
  category: string
  publishedAt: string
}

export interface PostDetail extends PostSummary {
  content: string
  views: number
}

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`/api${path}`)
  if (!res.ok) {
    throw new Error(`请求失败 ${res.status}: ${path}`)
  }
  return res.json() as Promise<T>
}

/** 获取已发布文章列表 */
export function fetchPosts(): Promise<{ list: PostSummary[] }> {
  return request<{ list: PostSummary[] }>('/posts')
}

/** 获取单篇文章详情（会让后端把 Redis 阅读量 +1） */
export function fetchPost(slug: string): Promise<PostDetail> {
  return request<PostDetail>(`/posts/${encodeURIComponent(slug)}`)
}
