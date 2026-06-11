# API Draft

Base URL in local development:

```txt
http://localhost:3001/api
```

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api` | API welcome message |
| `GET` | `/api/health` | MySQL and Redis health check |
| `GET` | `/api/posts` | Public post list |
| `GET` | `/api/posts/:slug` | Public post detail |

## Planned Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Admin login |
| `GET` | `/api/admin/posts` | Admin post list |
| `POST` | `/api/admin/posts` | Create post |
| `PUT` | `/api/admin/posts/:id` | Update post |
| `DELETE` | `/api/admin/posts/:id` | Delete post |
| `GET` | `/api/comments` | Public comments |
| `POST` | `/api/comments` | Create comment |
