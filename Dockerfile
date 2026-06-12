# ============================================================
# 开发用镜像（前端 web 和后端 api 共用这一个 Dockerfile）
# 思路：镜像里只装好 Node + pnpm + 依赖；真正的源码在运行时
#       由 docker-compose 用数据卷挂载进来，这样改代码能热更新。
# ============================================================

# 基础镜像：Node 20 的精简版（alpine 体积小）
FROM node:20-alpine

# 容器内的工作目录，后续命令都在这里执行
WORKDIR /app

# 开启 corepack 并锁定 pnpm 版本（和本机一致）
RUN corepack enable && corepack prepare pnpm@10.32.1 --activate

# 先只拷贝依赖清单（利用 Docker 缓存：依赖没变就不重新安装）
COPY package.json pnpm-lock.yaml .npmrc ./

# 在容器里（Linux 环境）安装依赖，生成 Linux 版的 node_modules
RUN pnpm install

# 再拷贝其余源码（开发时会被挂载卷覆盖，这步主要保证镜像可独立运行）
COPY . .

# 具体启动什么命令，由 docker-compose.yml 里各服务的 command 决定
