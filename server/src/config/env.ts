import 'dotenv/config'

export const env = {
  appName: process.env.APP_NAME || 'Youshika',
  port: Number(process.env.SERVER_PORT || process.env.PORT || 3001),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  mysql: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'youshika',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT || 6379),
  },
}
