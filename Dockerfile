# stage 1: build next js frontend
FROM node:24-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: build Spring Boot backend
FROM maven:3.9.9-eclipse-temurin-21 AS backend-builder
WORKDIR /app/backend
COPY backend/pom.xml .
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Stage 3: run everything
FROM eclipse-temurin:21-jdk
WORKDIR /app

RUN apt-get update && apt-get install -y curl gnupg nginx && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

COPY --from=backend-builder /app/backend/target/*.jar backend.jar

COPY --from=frontend-builder /app/frontend ./frontend

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD java -jar backend.jar & \
    cd frontend && npm start & \
    nginx -g 'daemon off;'
