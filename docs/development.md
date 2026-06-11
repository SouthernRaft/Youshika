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

The frontend follows a blog-friendly layout inspired by SouthernRaft:

- `pages`: route pages
- `components`: reusable Vue components
- `layouts`: page shells
- `styles`: global CSS
- `public`: static assets

The backend is isolated in `server/` so it can evolve from Express to NestJS later without moving the frontend.
