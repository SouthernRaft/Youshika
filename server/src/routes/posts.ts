import { Router } from 'express'
import { mysqlPool } from '../db/mysql'

export const postsRouter = Router()

postsRouter.get('/', async (_req, res, next) => {
  try {
    const [rows] = await mysqlPool.query(
      `SELECT id, title, slug, excerpt, category, published_at AS publishedAt
       FROM posts
       WHERE published = 1
       ORDER BY published_at DESC, id DESC
       LIMIT 20`,
    )

    res.json({ list: rows })
  } catch (error) {
    next(error)
  }
})

postsRouter.get('/:slug', async (req, res, next) => {
  try {
    const [rows] = await mysqlPool.query(
      `SELECT id, title, slug, excerpt, content, category, published_at AS publishedAt
       FROM posts
       WHERE slug = :slug AND published = 1
       LIMIT 1`,
      { slug: req.params.slug },
    )

    const list = rows as unknown[]
    if (list.length === 0) {
      res.status(404).json({ message: 'Post not found' })
      return
    }

    res.json(list[0])
  } catch (error) {
    next(error)
  }
})
