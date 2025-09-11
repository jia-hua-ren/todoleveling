# stage 1: build next js frontend
FROM node:24-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: build Spring Boot backend
FROM maven:3.9.9-eclipse-temurin-21 AS backend-builder
WORKDIR /app/backend
COPY backend/pom.xml .
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Stage 3: run everything with Supervisor
FROM eclipse-temurin:21-jdk
WORKDIR /app

RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    nginx \
    bash \
    gettext-base \
    supervisor \
 && rm -rf /var/lib/apt/lists/*

# --- Create non-root user & group ---
RUN groupadd -r spring && useradd -r -g spring springuser

# --- Copy backend jar ---
COPY --from=backend-builder /app/backend/target/*.jar app.jar

# --- Copy frontend build ---
COPY --from=frontend-builder /app/frontend ./frontend

# --- Copy nginx template ---
COPY nginx.conf /etc/nginx/nginx.conf.template

# --- Copy supervisor config ---
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# --- Fix ownership ---
RUN chown -R springuser:spring /app /var/log /var/run /etc/nginx /var/lib/nginx

# --- Switch to non-root user ---
USER springuser:spring

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
