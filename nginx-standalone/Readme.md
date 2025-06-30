### nginx-standalone (NGINX as Separate Container)

# ├── nginx/

# │ ├── dev.conf

# │ └── prod.conf

##### dev.conf

http {
server {
listen 80;
location / {
proxy_pass http://host.docker.internal:3000;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
}
}
}

###### prod.conf

http {
server {
listen 80;
location / {
proxy_pass http://host.docker.internal:3001;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
}
}
}

# Run commands:

docker run -d --name nginx-dev \
 -p 8080:80 \
 -v "$(pwd)/nginx/dev.conf":/etc/nginx/nginx.conf:ro \
 nginx

docker run -d --name nginx-prod \
 -p 8081:80 \
 -v "$(pwd)/nginx/prod.conf":/etc/nginx/nginx.conf:ro \
 nginx
