# Deployment Notes

This project is optimized for local development first. A later deployment can split the app into:

- Static frontend from `vite build`
- Node.js API server from `server/src/main.ts`
- MySQL 8.0
- Redis

## Suggested Production Checklist

- Set real environment variables instead of using `.env.example` defaults.
- Put MySQL and Redis behind private networking.
- Add authentication before enabling admin writes.
- Add database migrations before production data exists.
- Add reverse proxy rules for `/api` and static frontend assets.
