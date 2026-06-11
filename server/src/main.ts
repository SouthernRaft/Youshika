import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config/env'
import { healthRouter } from './routes/health'
import { postsRouter } from './routes/posts'

const app = express()

app.use(helmet())
app.use(cors({ origin: env.corsOrigin, credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

app.get('/api', (_req, res) => {
  res.json({
    name: env.appName,
    message: 'Youshika API is running.',
  })
})

app.use('/api/health', healthRouter)
app.use('/api/posts', postsRouter)

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error)
  res.status(500).json({ message: 'Internal server error' })
})

app.listen(env.port, () => {
  console.log(`API ready at http://localhost:${env.port}/api`)
})
