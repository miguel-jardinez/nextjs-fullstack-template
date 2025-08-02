# Docker Configuration Guide

This document explains the Docker setup for the Next.js template, including development and production configurations with support for internationalization, email services, and modular architecture.

## 🐳 Overview

The project uses a multi-stage Dockerfile optimized for both development and production environments, along with Docker Compose for local development. The setup includes support for internationalization, email services, and the modular folder structure.

## 📁 Docker Files

- **`Dockerfile`** - Multi-stage build for production and development
- **`compose.yaml`** - Local development environment with hot reload

## 🏗️ Multi-Stage Dockerfile

The Dockerfile is designed with multiple stages for optimal performance and security:

### Stage 1: Dependencies (`deps`)

```dockerfile
FROM oven/bun:${BUN_VERSION} AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install
```

**Purpose**: Installs all dependencies and is shared between production and development builds.

### Stage 2: Builder (`builder`)

```dockerfile
FROM deps AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build
```

**Purpose**: Builds the Next.js application for production with optimized output, including internationalization and email templates.

### Stage 3: Production Runtime (`runner`)

```dockerfile
FROM deps AS runner
WORKDIR /app
ENV NODE_ENV=${NODE_ENV}

# Security: Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only necessary files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/messages ./messages

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

**Purpose**: Creates the final production image with minimal footprint and security best practices, including internationalization message files.

### Stage 4: Development (`development`)

```dockerfile
FROM oven/bun:${BUN_VERSION} AS development
WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile
EXPOSE 3000
CMD ["bun", "run", "dev"]
```

**Purpose**: Optimized development environment with hot reload capabilities for all features including modules, i18n, and email templates.

## 🚀 Docker Compose Development

The `compose.yaml` file provides a complete development environment:

### Services

#### App Service

```yaml
app:
  depends_on:
    db:
      condition: service_healthy
  build:
    context: .
    target: development
  env_file:
    - .env
  ports:
    - "3000:3000"
  develop:
    watch:
      # Configuration files that trigger rebuilds
      - path: ./eslint.config.mjs
        action: rebuild
      - path: ./.prettierrc
        action: rebuild
      - path: ./package.json
        action: rebuild
      # Source files for hot reload
      - path: ./src
        action: sync
        target: /app/src
      # Internationalization files
      - path: ./messages
        action: sync
        target: /app/messages
```

**Features**:

- Hot reload for source files and modules
- Internationalization message file synchronization
- Automatic rebuilds for configuration changes
- Health check dependency on database
- Environment variable injection

#### Database Service

```yaml
db:
  image: postgres:16-alpine
  restart: always
  shm_size: 256mb
  environment:
    - POSTGRES_USER=postgres
    - POSTGRES_PASSWORD=postgres
    - POSTGRES_DB=expenses_db_local
    - PGDATA=/var/lib/postgresql/data/pgdata
  ports:
    - "5432:5432"
  volumes:
    - postgres_data:/var/lib/postgresql/data
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U postgres -d expenses_db_local"]
    interval: 5s
    timeout: 5s
    retries: 10
```

**Features**:

- PostgreSQL 16 with Alpine Linux
- Persistent data storage
- Health checks for service dependency
- Optimized shared memory

## 🔧 Usage Commands

### Development

```bash
# Start all services
docker compose up

# Start in background
docker compose up -d

# View logs
docker compose logs -f app

# Stop services
docker compose down

# Rebuild and start
docker compose up --build
```

### Production

```bash
# Build production image
docker build -t my-app .

# Run production container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e AUTH_SECRET="your-secret" \
  -e RESEND_API_KEY="your-resend-key" \
  -e NEXT_LOCALE="es" \
  my-app

# Build with specific target
docker build --target runner -t my-app-prod .
```

### Database Operations

```bash
# Access database shell
docker compose exec db psql -U postgres -d expenses_db_local

# Backup database
docker compose exec db pg_dump -U postgres expenses_db_local > backup.sql

# Restore database
docker compose exec -T db psql -U postgres -d expenses_db_local < backup.sql
```

## 🔒 Security Features

### Production Security

- **Non-root user**: Application runs as `nextjs` user (UID 1001)
- **Minimal attack surface**: Only necessary files copied to final image
- **Standalone output**: Next.js standalone build for optimized deployment
- **Environment isolation**: Separate stages prevent development dependencies in production
- **Email security**: Secure Resend API integration

### Development Security

- **Volume isolation**: Database data persisted in named volumes
- **Network isolation**: Services communicate through Docker network
- **Health checks**: Ensures database is ready before app starts
- **Environment variables**: Secure credential management

## 📊 Performance Optimizations

### Build Optimizations

- **Layer caching**: Dependencies installed in separate layer
- **Multi-stage builds**: Reduces final image size
- **Standalone output**: Next.js optimized for container deployment
- **Alpine base**: Lightweight base images
- **Internationalization**: Optimized message file loading

### Runtime Optimizations

- **Shared memory**: PostgreSQL configured with adequate shared memory
- **Health checks**: Prevents startup race conditions
- **Hot reload**: Development environment optimized for fast feedback
- **Module structure**: Efficient feature module loading

## 🌍 Environment Variables

### Required for Production

```env
DATABASE_URL="postgresql://user:password@host:port/database"
AUTH_SECRET="your-secure-secret-key"
AUTH_URL="https://your-domain.com"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXT_PUBLIC_AUTH_URL="https://your-domain.com"
RESEND_API_KEY="your-resend-api-key"
NEXT_LOCALE="es"
```

### Development Defaults

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/expenses_db_local"
AUTH_SECRET="dev-secret-key"
AUTH_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dev-nextauth-secret"
NEXT_PUBLIC_AUTH_URL="http://localhost:3000"
RESEND_API_KEY="your-resend-api-key"
NEXT_LOCALE="es"
```

### Environment Template

Create a `.env.template` file in your project root with the structure above but without sensitive values, so other developers can copy it to create their own `.env` file.

## 🏗️ Modular Architecture Support

### Module Structure in Docker

The Docker setup supports the modular architecture:

```dockerfile
# Copy modules for development
COPY --from=builder /app/src/modules ./src/modules

# Copy internationalization files
COPY --from=builder /app/messages ./messages

# Copy email templates
COPY --from=builder /app/src/modules/resend ./src/modules/resend
```

### Development Workflow

```bash
# Hot reload for modules
docker compose up

# Module-specific development
# The modular structure allows for:
# - Independent module development
# - Shared component reuse
# - Scalable architecture
```

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Deploy
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: docker build -t my-app .
      - name: Push to registry
        run: docker push my-app
```

### Docker Registry

```bash
# Tag for registry
docker tag my-app registry.example.com/my-app:latest

# Push to registry
docker push registry.example.com/my-app:latest

# Pull from registry
docker pull registry.example.com/my-app:latest
```

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Check what's using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
docker compose up -p 3001:3000
```

#### Database Connection Issues

```bash
# Check database logs
docker compose logs db

# Restart database
docker compose restart db

# Check database health
docker compose exec db pg_isready -U postgres
```

#### Build Failures

```bash
# Clean build cache
docker builder prune

# Rebuild without cache
docker compose build --no-cache

# Check build logs
docker compose build --progress=plain
```

#### Internationalization Issues

```bash
# Check message files
docker compose exec app ls -la /app/messages

# Verify locale configuration
docker compose exec app cat /app/src/i18n/config.ts
```

### Debug Commands

```bash
# Enter running container
docker compose exec app sh

# View container resources
docker stats

# Inspect container
docker inspect <container-id>

# View container logs
docker logs <container-id>
```

## 📈 Monitoring

### Health Checks

```bash
# Check service health
docker compose ps

# View health check logs
docker compose exec app wget --quiet --tries=1 --spider http://localhost:3000/api/health
```

### Resource Monitoring

```bash
# Monitor resource usage
docker stats

# View container details
docker compose top
```

## 🔄 Updates and Maintenance

### Update Base Images

```bash
# Pull latest images
docker compose pull

# Rebuild with latest base
docker compose build --no-cache
```

### Cleanup

```bash
# Remove unused containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Full cleanup
docker system prune -a
```

## 📧 Email Service Integration

### Resend Configuration

The Docker setup includes Resend email service integration:

```yaml
# Environment variables for email service
environment:
  - RESEND_API_KEY=${RESEND_API_KEY}
```

### Email Templates

Email templates are included in the build:

```dockerfile
# Copy email templates
COPY --from=builder /app/src/modules/resend ./src/modules/resend
```

### Email Service Health

```bash
# Check email service configuration
docker compose exec app echo $RESEND_API_KEY

# Test email service
docker compose exec app curl -X POST http://localhost:3000/api/email/test
```

## 🌍 Internationalization Support

### Message Files

Internationalization message files are included in the Docker image:

```dockerfile
# Copy internationalization files
COPY --from=builder /app/messages ./messages
```

### Locale Configuration

```bash
# Set default locale
export NEXT_LOCALE="es"

# Check available locales
docker compose exec app ls -la /app/messages
```

### Language Switching

The Docker setup supports real-time language switching:

```bash
# Update locale in running container
docker compose exec app sh -c "echo 'es' > /tmp/locale"
```

---

This Docker configuration provides a robust, secure, and performant environment for both development and production deployments, with full support for the modular architecture, internationalization, email services, and authentication features.
