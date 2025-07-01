# 🐳 nginx-in-compose (Basic NGINX + Node.js Reverse Proxy)

This project sets up a minimal **Node.js app behind an NGINX reverse proxy** using Docker Compose.  
Perfect for local development and learning how NGINX works with backend apps.

---

## 📁 Project Structure

nginx-in-compose/
├── docker-compose.yml # Base Compose config
├── docker-compose.dev.yml # Dev override (volumes, app-dev)
├── nginx/
│ └── conf.d/
│ └── dev.conf # Basic NGINX reverse proxy config
├── src/
│ └── app.js # Express app (example)

## 🔧 Features

- ✅ Simple NGINX reverse proxy to Node.js
- ✅ Clean separation of concerns via Docker Compose
- ✅ Hot-reload ready for development
- 🚫 No SSL (plain HTTP)

## 📝 NGINX Config (dev.conf)

```bash
server {
  listen 80;
  server_name localhost;

  location / {
    proxy_pass http://app-dev:8080;
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
  }
}
```

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml -p dev up -d --build
```
