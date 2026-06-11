# 优诗卡的博客 · Youshika

一个个人**全栈**博客项目：前端参考 SouthernRaft 的清爽气质，技术栈换成 Vue 3 + Vite；后端独立为 Node.js + Express，配 MySQL 与 Redis。

目录刻意分成 **`client/`（前端）** 和 **`server/`（后端）** 两大块，外加 `docker-compose.yml` 管数据库，三块各管各的，一眼能分辨。

## 技术栈

| 层 | 技术 |
| --- | --- |
| 前端 | Vue 3 + Vite + TypeScript |
| 路由 | Vue Router |
| 后端 | Node.js + Express（TypeScript，用 tsx 运行） |
| 数据库 | MySQL 8.0 |
| 缓存 | Redis（文章列表缓存 + 阅读量计数） |
| 本地环境 | Docker / Docker Compose |
| 包管理 | pnpm |

## 目录结构

```txt
Youshika/
├─ client/                 # 👈 前端（所有 Vue 代码）
│  ├─ index.html
│  ├─ vite.config.ts
│  ├─ tsconfig.json
│  ├─ env.d.ts
│  ├─ public/              # 静态资源（favicon 等）
│  └─ src/
│     ├─ main.ts           # 前端入口
│     ├─ App.vue
│     ├─ router.ts         # 路由表
│     ├─ api/              # 调后端接口的封装
│     ├─ pages/            # 页面：首页/文章/归档/标签/关于/后台
│     ├─ components/       # 组件（文章卡片等）
│     ├─ layouts/          # 页面布局
│     ├─ styles/           # 全局样式
│     └─ locales/          # 文案 / 多语言预留
│
├─ server/                 # 👈 后端（所有 Node/API 代码）
│  ├─ tsconfig.json
│  ├─ schema.sql           # 建表 + 初始数据
│  └─ src/
│     ├─ main.ts           # 后端入口（Express）
│     ├─ config/           # 环境变量
│     ├─ db/               # mysql.ts / redis.ts 连接
│     └─ routes/           # 接口：health / posts
│
├─ docs/                   # 开发、部署、接口文档
├─ docker-compose.yml      # 👈 一条命令起 MySQL + Redis
├─ .env.example            # 环境变量模板
└─ package.json            # 统一管理前后端脚本
```

## 本地启动

```bash
# 1. 安装依赖
pnpm install

# 2. 准备环境变量（Windows PowerShell: copy .env.example .env）
cp .env.example .env

# 3. 用 Docker 起 MySQL + Redis（需先装 Docker Desktop）
pnpm db:up

# 4. 同时启动前端 + 后端
pnpm dev
```

- 前端：http://localhost:5173
- 后端 API：http://localhost:3001/api
- 健康检查：http://localhost:3001/api/health

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 同时启动前端和后端 |
| `pnpm dev:web` | 只启动前端（Vite） |
| `pnpm dev:api` | 只启动后端（Express） |
| `pnpm build` | 类型检查并构建前端到 `client/dist` |
| `pnpm db:up` | 启动 MySQL 和 Redis 容器 |
| `pnpm db:down` | 停止容器 |
| `pnpm db:logs` | 查看数据库容器日志 |

## 数据流（这是一个真正的全栈环）

1. 浏览器访问首页 → 前端 `client/src/api/posts.ts` 请求 `/api/posts`
2. Vite 把 `/api` 代理到后端 `http://localhost:3001`
3. 后端先查 Redis 缓存，未命中再查 MySQL，并把结果缓存 60 秒
4. 打开文章详情 → 后端用 Redis `INCR` 给该文章阅读量 +1

## 后续方向

- 接入文章 Markdown 编辑与渲染
- 增加 JWT 登录和后台文章管理
- 增加评论、标签、归档、搜索 API
- 增加 Redis 点赞和热门文章排行
- 真正上线部署（前端静态 + 后端服务器 + 托管数据库）
