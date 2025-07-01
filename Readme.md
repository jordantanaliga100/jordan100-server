# 🐳 Docker Usage Guide

This guide shows two approaches for running services using Docker:

- **Imperative (Manual) Docker Usage**
- **Declarative Multi-Container Orchestration using Docker Compose**

---

## 🐳 Imperative Docker Usage

### 🔧 For Development

```bash
docker run -d --name nginx-dev \
  -p 8080:80 \
  -v $(pwd)/nginx/dev.conf:/etc/nginx/nginx.conf:ro \
  --rm \
  nginx
```

### 🔧 For Production

```bash
docker run -d --name nginx-prod \
 -p 8081:80 \
 -v $(pwd)/nginx/prod.conf:/etc/nginx/nginx.conf:ro \
 --rm \
 nginx
```

## 🐳 Declarative Multi-Container Orchestration using Docker Compose

@Dockerfile

```bash
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3000
EXPOSE ${PORT}
CMD ["node", "index.js"]
```

@yml

```bash
version: "3.8"

services:
  dev:
    container_name: jordan-dev
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 3000:8080
    env_file: .env.local
    volumes:
      - .:/app
      - /app/node_modules
    restart: unless-stopped
    command: npm run start:dev
  prod:
    container_name: jordan-prod
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 3001:8080
    env_file: .env.prod
    restart: unless-stopped
    command: npm run start:prod


```
