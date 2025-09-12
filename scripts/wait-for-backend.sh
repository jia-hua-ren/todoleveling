#!/bin/sh
set -e

# Start frontend
cd /app/frontend
PORT=3000 npm start &

# Start Spring Boot
java -jar /app/app.jar --server.port=8080 --spring.profiles.active=${SPRING_PROFILES_ACTIVE} &

# Wait for Spring Boot to be healthy
echo "Waiting for Spring Boot to be ready..."
until curl -s http://localhost:8080/actuator/health | grep '"status":"UP"' > /dev/null; do
    echo "Still waiting for Spring Boot..."
  sleep 2
done

echo "Spring Boot is UP. Starting Nginx..."

# Generate nginx.conf from template
envsubst '\$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start Nginx (foreground)
nginx -g 'daemon off;'
