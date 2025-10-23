This is a project accompanying Nginx Crash Course

Commands used in the tutorial

start nginx
nginx

get options
nginx -h

restart nginx
nginx -s reload

stop nginx
nginx -s stop

print logs
tail -f /usr/local/var/log/nginx/access.log

restart nginx
nginx -s reload

create folder for nginx certificates
mkdir ~/nginx-certs
cd ~/nginx-certs

create self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx-selfsigned.key -out nginx-selfsigned.crt
