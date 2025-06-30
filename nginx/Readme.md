##### For Dev

docker run -d --name nginx-dev \
 -p 8080:80 \
 -v $(pwd)/nginx/dev.conf:/etc/nginx/nginx.conf:ro \
 --rm \
 nginx

##### For Prod

docker run -d --name nginx-prod \
 -p 8081:80 \
 -v $(pwd)/nginx/prod.conf:/etc/nginx/nginx.conf:ro \
 --rm \
 nginx
