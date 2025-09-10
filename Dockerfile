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

# Stage 3: run everything
FROM eclipse-temurin:21-jdk
WORKDIR /app

RUN apk add --no-cache nodejs npm nginx bash gettext

RUN addgroup --system spring && adduser --system spring --ingroup spring

USER spring:spring

COPY --from=backend-build /app/backend/target/*.jar app.jar
RUN chown spring:spring app.jar

COPY --from=frontend-builder /app/frontend ./frontend

COPY nginx.conf /etc/nginx/nginx.conf.template

CMD sh -c "\
  cd /app/frontend && npm start & \
  java -jar /app/app.jar --server.port=8080 --spring.profiles.active=${SPRING_PROFILES_ACTIVE} & \
  envsubst '\$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && \
  nginx -g 'daemon off;' \
"
