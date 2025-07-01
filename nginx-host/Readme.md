###### app is running in node dev server

```sh
This repo was configured in the host (jordan_ubuntu) mysite (sites-enabled)
```

##### 🌐 nginx-host (Local NGINX Reverse Proxy to Node.js)

This project demonstrates a simple local setup where:

- 🧩 Node.js is running on your machine (e.g. via `nodemon`)
- 🌍 NGINX is installed on the **host system** (not in Docker)
- 🔁 NGINX acts as a reverse proxy from `http://localhost` to `http://localhost:8080`

---

###### 📝 NGINX Configuration

`/etc/nginx/sites-available/mysite`

```nginx
server {
  listen 80;
  server_name localhost;

  location / {
    proxy_pass http://localhost:8080;
    proxy_http_version 1.1;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

###### Link config to sites-enabled

sudo ln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/

###### Test nginx config

sudo nginx -t

###### Reload nginx

sudo systemctl reload nginx

### 🚀 Run the Node.js App

npm install
npm run dev # or: nodemon src/app.js

### 🌐 Access in Browser
http://localhost
