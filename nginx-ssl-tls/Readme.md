# 🔐 nginx-ssl-tls (Dev Environment with Self-Signed SSL)

This project demonstrates a secure **Node.js + NGINX reverse proxy setup with HTTPS** in a Docker Compose development environment using a **self-signed certificate**.

---

## 📁 Project Structure

nginx-ssl-tls/
├── docker-compose.yml # Base config
├── docker-compose.dev.yml # Dev-specific overrides
├── nginx/
│ ├── conf.d/
│ │ └── dev.conf # NGINX config (HTTP + HTTPS)
│ └── ssl/
│ ├── self.crt # Self-signed certificate
│ └── self.key # Private key

## 🧪 Features

- ✅ Reverse proxy with NGINX
- ✅ HTTPS support using self-signed SSL
- ✅ HTTP auto-redirects to HTTPS
- ✅ Docker Compose for isolated dev environment

## 🛠️ Setup Instructions

### 1. 🔧 Generate Self-Signed SSL Certificate

```bash
mkdir -p nginx/ssl

openssl req -x509 -newkey rsa:2048 -nodes -days 365 \
  -keyout nginx/ssl/self.key \
  -out nginx/ssl/self.crt \
  -subj "/CN=localhost"
```

### 2. 📝 Configure NGINX (dev)

```sh
# HTTP - Redirect to HTTPS
server {
  listen 80;
  server_name localhost;
  return 301 https://$host$request_uri;

  # Reference only:
  # location / {
  #   proxy_pass http://app-dev:8080;
  #   ...
  # }
}

# HTTPS - Secure proxy
server {
  listen 443 ssl;
  server_name localhost;

  ssl_certificate     /etc/nginx/ssl/self.crt;
  ssl_certificate_key /etc/nginx/ssl/self.key;
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers HIGH:!aNULL:!MD5;

  location / {
    proxy_pass http://app-dev:8080;
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
  }
}

```

### 3. 🐳 Run with Docker Compose

docker-compose -f docker-compose.yml -f docker-compose.dev.yml -p dev up -d --build
