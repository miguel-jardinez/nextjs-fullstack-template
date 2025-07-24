# Multi-stage Dockerfile for Next.js application with Bun
# Supports both production and development environments

# Build arguments
ARG BUN_VERSION=1.2.0
ARG NODE_ENV=production

# =============================================================================
# DEPENDENCIES STAGE
# =============================================================================
# This stage installs all dependencies and is shared between production and development
FROM oven/bun:${BUN_VERSION} AS deps
WORKDIR /app

# Copy package files first for better layer caching
COPY package.json bun.lock ./
RUN bun install

# =============================================================================
# PRODUCTION BUILD STAGE
# =============================================================================
# This stage builds the application for production
FROM deps AS builder
WORKDIR /app

# Copy node_modules from deps stage to avoid reinstalling
COPY --from=deps /app/node_modules ./node_modules
# Copy all source code
COPY . .

# Disable Next.js telemetry for cleaner builds
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN bun run build

# =============================================================================
# PRODUCTION RUNTIME STAGE
# =============================================================================
# This stage creates the final production image
FROM deps AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=${NODE_ENV}

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy static assets
COPY --from=builder /app/public ./public
# Copy the standalone build (optimized for production)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port and set environment variables
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the production server
CMD ["node", "server.js"]

# =============================================================================
# DEVELOPMENT STAGE
# =============================================================================
# This stage is optimized for development with hot reload
FROM oven/bun:${BUN_VERSION} AS development
WORKDIR /app

# Copy all source code for development
COPY . .

# Install dependencies with frozen lockfile for consistency
RUN bun install --frozen-lockfile

# Expose development port
EXPOSE 3000

# Start development server with hot reload
CMD ["bun", "run", "dev"]