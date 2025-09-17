#!/bin/sh
set -e

# Start Spring Boot
java -jar /app/app.jar --server.port=8080 --server.address=127.0.0.1 --spring.profiles.active=${SPRING_PROFILES_ACTIVE} &

# Start frontend
cd /app/frontend
npm start -- -H 127.0.0.1 -p 3000 &

until curl -sf http://127.0.0.1:8080/actuator/health; do
  echo "Waiting for backend..."
  sleep 10
done

echo "Spring Boot is UP. Starting Nginx..."

# Generate nginx.conf from template
envsubst '\$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start Nginx (foreground)
exec nginx -g 'daemon off;'
