#!/bin/bash
# Docker Entrypoint for Geriatrics Platform
# Handles startup, health checks, and graceful shutdown

set -e

# Colors for logging
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO:${NC} $1"
}

log_success() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] SUCCESS:${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1"
}

log_error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1"
}

# Trap signals for graceful shutdown
cleanup() {
    log_info "Received shutdown signal, stopping services..."
    if [ ! -z "$SERVER_PID" ]; then
        kill -TERM "$SERVER_PID" 2>/dev/null || true
        wait "$SERVER_PID" 2>/dev/null || true
    fi
    log_success "Graceful shutdown completed"
    exit 0
}

trap cleanup SIGTERM SIGINT

# Environment validation
validate_environment() {
    log_info "Validating environment configuration..."
    
    required_vars=(
        "DATABASE_URL"
        "REDIS_URL"
        "JWT_SECRET"
        "ENCRYPTION_KEY"
    )
    
    missing_vars=()
    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ]; then
            missing_vars+=("$var")
        fi
    done
    
    if [ ${#missing_vars[@]} -gt 0 ]; then
        log_error "Missing required environment variables:"
        for var in "${missing_vars[@]}"; do
            log_error "  - $var"
        done
        exit 1
    fi
    
    log_success "Environment validation passed"
}

# Database connectivity check
check_database() {
    log_info "Checking database connectivity..."
    
    # Extract database connection details
    DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\([^:]*\):.*/\1/p')
    DB_PORT=$(echo $DATABASE_URL | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
    
    max_attempts=30
    attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if nc -z "$DB_HOST" "$DB_PORT" 2>/dev/null; then
            log_success "Database connection established"
            return 0
        fi
        
        log_warning "Database not ready, attempt $attempt/$max_attempts"
        sleep 2
        ((attempt++))
    done
    
    log_error "Failed to connect to database after $max_attempts attempts"
    exit 1
}

# Redis connectivity check
check_redis() {
    log_info "Checking Redis connectivity..."
    
    # Extract Redis connection details
    REDIS_HOST=$(echo $REDIS_URL | sed -n 's/redis:\/\/\([^:]*\):.*/\1/p')
    REDIS_PORT=$(echo $REDIS_URL | sed -n 's/.*:\([0-9]*\).*/\1/p')
    
    max_attempts=30
    attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if nc -z "$REDIS_HOST" "$REDIS_PORT" 2>/dev/null; then
            log_success "Redis connection established"
            return 0
        fi
        
        log_warning "Redis not ready, attempt $attempt/$max_attempts"
        sleep 2
        ((attempt++))
    done
    
    log_error "Failed to connect to Redis after $max_attempts attempts"
    exit 1
}

# Health check endpoint
start_health_server() {
    log_info "Starting health check server on port 8080..."
    
    cat > /tmp/health-server.js << 'EOF'
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/api/health') {
        const health = {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            environment: process.env.NODE_ENV || 'development'
        };
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(health));
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(8080, '0.0.0.0', () => {
    console.log('Health check server running on port 8080');
});

process.on('SIGTERM', () => {
    console.log('Health server shutting down...');
    server.close(() => process.exit(0));
});
EOF
    
    node /tmp/health-server.js &
    HEALTH_PID=$!
}

# Initialize application
initialize_app() {
    log_info "Initializing Geriatrics Platform v2.0..."
    
    # Create necessary directories
    mkdir -p /app/logs /app/uploads /app/reports
    
    # Set proper permissions
    chmod 755 /app/logs /app/uploads /app/reports
    
    log_success "Application initialized"
}

# Start main application
start_application() {
    log_info "Starting main application server..."
    
    cd /app/server
    
    # Start the Node.js application
    if [ -f "dist/index.js" ]; then
        node dist/index.js &
        SERVER_PID=$!
        log_success "Server started with PID: $SERVER_PID"
    elif [ -f "index.js" ]; then
        node index.js &
        SERVER_PID=$!
        log_success "Server started with PID: $SERVER_PID"
    else
        log_error "No server entry point found"
        exit 1
    fi
}

# Monitor application
monitor_application() {
    log_info "Monitoring application health..."
    
    while true; do
        if [ ! -z "$SERVER_PID" ] && ! kill -0 "$SERVER_PID" 2>/dev/null; then
            log_error "Main application process died unexpectedly"
            exit 1
        fi
        sleep 10
    done
}

# Main execution
main() {
    log_info "🚀 Starting Geriatrics Platform v2.0 Container"
    log_info "Environment: ${NODE_ENV:-development}"
    log_info "Timezone: ${ISRAEL_TIMEZONE:-UTC}"
    
    # Set timezone if specified
    if [ ! -z "$ISRAEL_TIMEZONE" ]; then
        export TZ="$ISRAEL_TIMEZONE"
        log_info "Timezone set to: $TZ"
    fi
    
    # Execute startup sequence
    validate_environment
    check_database
    check_redis
    initialize_app
    start_health_server
    start_application
    
    log_success "🎉 Geriatrics Platform v2.0 started successfully!"
    log_info "Main server PID: $SERVER_PID"
    log_info "Health server PID: $HEALTH_PID"
    log_info "Ready to serve patients and families"
    
    # Monitor and wait
    monitor_application
}

# Execute main function
main "$@"