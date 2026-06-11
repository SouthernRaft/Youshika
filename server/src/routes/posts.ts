import { Router } from 'express'
import { mysqlPool } from '../db/mysql'
import { redis } from '../db/redis'

export const postsRouter = Router()

const LIST_CACHE_KEY = 'posts:list'
const LIST_CACHE_TTL = 60 // 秒

/** 确保 Redis 已连接（lazyConnect 下首次使用需手动连） */
async function ensureRedis() {
  if (redis.status === 'wait') await redis.connect()
}

// GET /api/posts —— 文章列表，优先读 Redis 缓存，未命中再查 MySQL 并回写缓存
postsRouter.get('/', async (_req, res, next) => {
  try {
    try {
      await ensureRedis()
      const cached = await redis.get(LIST_CACHE_KEY)
      if (cached) {
        res.json({ list: JSON.parse(cached), cached: true })
        return
      }
    } catch {
      // Redis 不可用时降级为直接查库，不影响功能
    }

    const [rows] = await mysqlPool.query(
      `SELECT id, title, slug, excerpt, category, published_at AS publishedAt
       FROM posts
       WHERE published = 1
       ORDER BY published_at DESC, id DESC
       LIMIT 20`,
    )

    try {
      await ensureRedis()
      await redis.set(LIST_CACHE_KEY, JSON.stringify(rows), 'EX', LIST_CACHE_TTL)
    } catch {
      // 写缓存失败可忽略
    }

    res.json({ list: rows, cached: false })
  } catch (error) {
    next(error)
  }
})

// GET /api/posts/:slug —— 文章详情，并用 Redis 计数阅读量
postsRouter.get('/:slug', async (req, res, next) => {
  try {
    const [rows] = await mysqlPool.query(
      `SELECT id, title, slug, excerpt, content, category, published_at AS publishedAt
       FROM posts
       WHERE slug = :slug AND published = 1
       LIMIT 1`,
      { slug: req.params.slug },
    )

    const list = rows as Array<Record<string, unknown>>
    if (list.length === 0) {
      res.status(404).json({ message: 'Post not found' })
      return
    }

    const post = list[0]

    // Redis 阅读量 +1（失败则回退为 0，不影响返回文章）
    let views = 0
    try {
      await ensureRedis()
      views = await redis.incr(`post:views:${req.params.slug}`)
    } catch {
      views = 0
    }

    res.json({ ...post, views })
  } catch (error) {
    next(error)
  }
})
