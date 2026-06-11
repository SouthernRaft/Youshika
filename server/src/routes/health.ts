import { Router } from 'express'
import { mysqlPool } from '../db/mysql'
import { redis } from '../db/redis'

export const healthRouter = Router()

healthRouter.get('/', async (_req, res) => {
  const status = {
    ok: true,
    mysql: false,
    redis: false,
    time: new Date().toISOString(),
  }

  try {
    await mysqlPool.query('SELECT 1')
    status.mysql = true
  } catch {
    status.ok = false
  }

  try {
    if (redis.status === 'wait') await redis.connect()
    await redis.ping()
    status.redis = true
  } catch {
    status.ok = false
  }

  res.status(status.ok ? 200 : 503).json(status)
})
