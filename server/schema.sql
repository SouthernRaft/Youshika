-- 强制本次导入连接使用 utf8mb4，避免中文（如 Docker 初始化）变成乱码
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS posts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL,
  excerpt VARCHAR(500) NOT NULL DEFAULT '',
  content LONGTEXT NOT NULL,
  category VARCHAR(80) NOT NULL DEFAULT '随笔',
  tags VARCHAR(255) NOT NULL DEFAULT '',
  published TINYINT(1) NOT NULL DEFAULT 1,
  published_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_posts_slug (slug),
  KEY idx_posts_published_at (published, published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS comments (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  post_id BIGINT UNSIGNED NOT NULL,
  author VARCHAR(80) NOT NULL,
  email VARCHAR(160) NOT NULL DEFAULT '',
  content TEXT NOT NULL,
  approved TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_comments_post_id (post_id),
  CONSTRAINT fk_comments_post_id FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO posts (title, slug, excerpt, content, category, tags)
VALUES
  ('新的开始', 'hello-youshika', '从静态博客思路出发，重新搭建一个更自由的全栈博客项目。', '# 新的开始\n\n这里是第一篇文章。', '随笔', '随笔,博客'),
  ('为什么选择 Vue 3 + Vite', 'vue-vite-stack', '保持前端轻快，后端独立演进，适合个人项目长期维护。', '# 为什么选择 Vue 3 + Vite\n\nVite 让本地开发非常轻快。', '技术', '技术,Vue')
ON DUPLICATE KEY UPDATE title = VALUES(title);
