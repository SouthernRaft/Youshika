# 优诗卡的博客 · Youshika

一个参考 SouthernRaft 目录气质重建的个人全栈博客项目。

前端保持博客项目常见的清爽结构：`pages`、`components`、`layouts`、`styles`、`public` 直接放在根目录；后端服务独立放在 `server/`。项目主要用于本地笔记本开发，后续适合开源并使用 Git 管理。

## 技术栈

| 层 | 技术 |
| --- | --- |
| 前端 | Vue 3 + Vite + TypeScript |
| 路由 | Vue Router |
| 后端 | Node.js + Express |
| 数据库 | MySQL 8.0 |
| 缓存 | Redis |
| 本地环境 | Docker / Docker Compose |
| 包管理 | pnpm |

## 目录结构

```txt
Youshika/
├─ .github/              # GitHub Actions
├─ .vscode/              # 推荐编辑器设置
├─ components/           # Vue 组件
├─ layouts/              # 页面布局
├─ locales/              # 站点文案与多语言预留
├─ pages/                # 博客页面，风格参考 SouthernRaft
│  ├─ about/
│  ├─ admin/
│  ├─ archives/
│  ├─ posts/
│  └─ tags/
├─ public/               # 静态资源
├─ server/               # 后端服务
│  ├─ src/
│  │  ├─ config/
│  │  ├─ db/
│  │  └─ routes/
│  └─ schema.sql
├─ styles/               # 全局样式
├─ docs/                 # 开发、部署、接口文档
├─ App.vue
├─ main.ts
├─ router.ts
├─ vite.config.ts
├─ docker-compose.yml
└─ package.json
```

## 本地启动

```bash
pnpm install
cp .env.example .env
pnpm db:up
pnpm dev
```

- 前端：http://localhost:5173
- 后端：http://localhost:3001/api
- 健康检查：http://localhost:3001/api/health

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 同时启动前端和后端 |
| `pnpm dev:web` | 只启动 Vite 前端 |
| `pnpm dev:server` | 只启动 Express 后端 |
| `pnpm build` | 类型检查并构建前端 |
| `pnpm db:up` | 启动 MySQL 和 Redis |
| `pnpm db:down` | 停止 MySQL 和 Redis |

## 后续方向

- 接入文章 Markdown 编辑与渲染
- 增加 JWT 登录和后台文章管理
- 增加评论、标签、归档、搜索 API
- 增加 Redis 阅读量、点赞和热门文章排行
- 完善部署脚本与 CI
