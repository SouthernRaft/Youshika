# Development

## Requirements

- Node.js 20+
- pnpm
- Docker Desktop

## Setup

```bash
pnpm install
cp .env.example .env
pnpm db:up
pnpm dev
```

## Local URLs

- Web: http://localhost:5173
- API: http://localhost:3001/api
- Health: http://localhost:3001/api/health

## Directory Notes

代码分成两大块，方便分辨：

- `client/` —— 前端（Vue 3 + Vite）
  - `client/src/pages`: 路由页面
  - `client/src/components`: 可复用组件
  - `client/src/layouts`: 页面布局
  - `client/src/api`: 调后端接口的封装
  - `client/src/styles`: 全局样式
  - `client/public`: 静态资源
- `server/` —— 后端（Node.js + Express），独立演进，将来可换成 NestJS 而不影响前端
  - `server/src/routes`: 接口
  - `server/src/db`: MySQL / Redis 连接
  - `server/src/config`: 环境变量

前后端用一个根 `package.json` 统一管理脚本：`pnpm dev:web` 跑 `vite client`，`pnpm dev:api` 跑 `tsx server/src/main.ts`。
