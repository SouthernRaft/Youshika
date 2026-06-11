import mysql from 'mysql2/promise'
import { env } from '../config/env'

export const mysqlPool = mysql.createPool({
  ...env.mysql,
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true,
  charset: 'utf8mb4',
})
