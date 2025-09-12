#!/bin/sh
set -e

# Start Spring Boot
java -jar /app/app.jar --server.port=8080 --server.address=127.0.0.1 --spring.profiles.active=${SPRING_PROFILES_ACTIVE} &

# Start frontend
cd /app/frontend
HOST=127.0.0.1 PORT=3000 npm start &

echo "Spring Boot is UP. Starting Nginx..."

# Generate nginx.conf from template
envsubst '\$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start Nginx (foreground)
exec nginx -g 'daemon off;'
