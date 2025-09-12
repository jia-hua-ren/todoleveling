#!/bin/sh

# Start backend bound to localhost only
java -jar -Dserver.address=127.0.0.1 -Dserver.port=8080 backend.jar &

# Start frontend bound to localhost only
HOST=127.0.0.1 PORT=3000 npm start &

# Optionally wait until backend is healthy
until curl -sf http://127.0.0.1:8080/actuator/health; do
  echo "Waiting for backend..."
  sleep 10
done

# Start Nginx (the only process exposed on 0.0.0.0)
exec nginx -g 'daemon off;'
