# Enterprise Geriatrics Platform - Multi-stage Docker Build
# Production-ready containerization with security optimization

# Build stage for client
FROM node:18-alpine AS client-builder
LABEL maintainer="Shaare Zedek Medical Center - Geriatrics Department"
LABEL version="1.0.0"
LABEL description="Enterprise Geriatrics Subspecialty Platform"

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Install dependencies with clean slate
RUN npm ci --only=production && npm cache clean --force

# Copy client source
COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./

# Build client application
RUN npm run client:build

# Build stage for server
FROM node:18-alpine AS server-builder
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/tsconfig.json ./server/
COPY server/package*.json ./server/

# Install dependencies
RUN cd server && npm ci --only=production

# Copy server source
COPY server/src/ ./server/src/

# Build server application
RUN npm run server:build

# Production stage
FROM node:18-alpine AS production
LABEL maintainer="Shaare Zedek Medical Center - Geriatrics Department"

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S geriatrics -u 1001

# Install security updates and required packages
RUN apk add --no-cache \
    dumb-init \
    tini \
    curl \
    && apk upgrade --no-cache

WORKDIR /app

# Copy built applications
COPY --from=client-builder --chown=geriatrics:nodejs /app/dist ./client/
COPY --from=server-builder --chown=geriatrics:nodejs /app/server/dist ./server/
COPY --from=server-builder --chown=geriatrics:nodejs /app/server/node_modules ./server/node_modules/

# Copy configuration files
COPY --chown=geriatrics:nodejs server/package*.json ./server/
COPY --chown=geriatrics:nodejs docker-entrypoint.sh ./

# Make entrypoint executable
RUN chmod +x docker-entrypoint.sh

# Create necessary directories with proper permissions
RUN mkdir -p /app/logs /app/uploads /app/reports && \
    chown -R geriatrics:nodejs /app

# Switch to non-root user
USER geriatrics

# Health check for container monitoring
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/api/health || exit 1

# Expose ports
EXPOSE 3000 8080

# Use tini for proper signal handling
ENTRYPOINT ["/sbin/tini", "--"]

# Start the application
CMD ["./docker-entrypoint.sh"]