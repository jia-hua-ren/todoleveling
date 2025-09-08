# Stage 1: Build with Maven
FROM maven:3.9.9-eclipse-temurin-21-slim AS build

WORKDIR /app

# Copy pom.xml and download dependencies first (cache optimization)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build the JAR
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: run the app
FROM eclipse-temurin:21-jdk-slim
WORKDIR /app

# Create a non-root user
RUN addgroup --system spring && adduser --system spring --ingroup spring

# Copy the jar
COPY --from=builder /app/target/*.jar app.jar

# Change ownership
RUN chown spring:spring app.jar

# Switch to the new user
USER spring:spring

EXPOSE 8080
CMD ["sh", "-c", "java -jar app.jar --server.port=$PORT --spring.profiles.active=${SPRING_PROFILES_ACTIVE}"]