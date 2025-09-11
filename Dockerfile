# stage 1: build Next.js frontend
FROM node:24-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# stage 2: build Spring Boot backend
FROM maven:3.9.9-eclipse-temurin-21 AS backend-builder
WORKDIR /app/backend
COPY backend/pom.xml .
COPY backend/src ./src
RUN mvn clean package -DskipTests

# stage 3: run everything with Supervisor
FROM eclipse-temurin:21-jdk
WORKDIR /app

# install deps
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    nginx \
    bash \
    gettext-base \
    supervisor \
 && rm -rf /var/lib/apt/lists/*

# create non-root user & group
RUN groupadd -r spring && useradd -r -g spring springuser

# copy backend jar (owned by springuser)
COPY --from=backend-builder --chown=springuser:spring /app/backend/target/*.jar app.jar

# copy frontend build (owned by springuser)
COPY --from=frontend-builder --chown=springuser:spring /app/frontend ./frontend

# copy nginx template to /app/nginx (owned by springuser)
RUN mkdir -p /app/nginx
COPY --chown=springuser:spring nginx.conf /app/nginx/nginx.conf.template

# copy supervisor config (owned by springuser)
COPY --chown=springuser:spring supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# switch to non-root user
USER springuser:spring

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
