#!/bin/bash
# Production Deployment Script for Geriatrics Platform v2.0
# Shaare Zedek Medical Center

set -e

echo "🚀 Starting Geriatrics Platform v2.0 Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_error "Please do not run this script as root for security reasons"
    exit 1
fi

# Check Docker installation
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if environment file exists
if [ ! -f ".env.production" ]; then
    print_warning "Production environment file not found. Creating template..."
    cp .env.production.example .env.production
    print_error "Please configure .env.production with your production values before running again."
    exit 1
fi

print_status "Checking system requirements..."

# Check available disk space (minimum 20GB)
available_space=$(df . | tail -1 | awk '{print $4}')
required_space=20971520 # 20GB in KB

if [ "$available_space" -lt "$required_space" ]; then
    print_error "Insufficient disk space. Required: 20GB, Available: $(($available_space/1048576))GB"
    exit 1
fi

print_success "System requirements met"

# Create necessary directories
print_status "Creating data directories..."
sudo mkdir -p /opt/geriatrics/data/{postgres,redis,elasticsearch,backups}
sudo mkdir -p /opt/geriatrics/logs/{app,nginx,postgres,redis}
sudo mkdir -p /opt/geriatrics/ssl
sudo mkdir -p /opt/geriatrics/config

print_success "Directories created"

# Set proper permissions
print_status "Setting permissions..."
sudo chown -R $USER:$USER /opt/geriatrics
chmod -R 755 /opt/geriatrics

# Stop existing containers if running
print_status "Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down --remove-orphans || true

# Pull latest images
print_status "Pulling latest Docker images..."
docker-compose -f docker-compose.prod.yml pull

# Build the application
print_status "Building application..."
docker-compose -f docker-compose.prod.yml build --no-cache

# Generate SSL certificates if they don't exist
if [ ! -f "/opt/geriatrics/ssl/cert.pem" ]; then
    print_status "Generating self-signed SSL certificates..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /opt/geriatrics/ssl/key.pem \
        -out /opt/geriatrics/ssl/cert.pem \
        -subj "/C=IL/ST=Jerusalem/L=Jerusalem/O=Shaare Zedek/CN=geriatrics.shaare-zedek.org.il"
    
    print_warning "Self-signed certificates generated. Replace with proper certificates for production."
fi

# Create configuration files if they don't exist
if [ ! -f "config/nginx.conf" ]; then
    print_status "Creating Nginx configuration..."
    mkdir -p config
    cat > config/nginx.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    upstream geriatrics_app {
        server geriatrics-app:3000;
    }

    server {
        listen 80;
        server_name geriatrics.shaare-zedek.org.il;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name geriatrics.shaare-zedek.org.il;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        location / {
            proxy_pass http://geriatrics_app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /api/health {
            proxy_pass http://geriatrics_app;
            access_log off;
        }
    }
}
EOF
fi

# Start the services
print_status "Starting production services..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
print_status "Waiting for services to start..."
sleep 30

# Check if services are healthy
print_status "Checking service health..."

services=("geriatrics-app-prod" "postgres-primary-prod" "redis-primary-prod" "elasticsearch-prod")
failed_services=()

for service in "${services[@]}"; do
    if ! docker ps --filter "name=$service" --filter "status=running" | grep -q "$service"; then
        failed_services+=("$service")
    fi
done

if [ ${#failed_services[@]} -eq 0 ]; then
    print_success "All services are running successfully!"
else
    print_error "The following services failed to start:"
    for service in "${failed_services[@]}"; do
        echo "  - $service"
    done
    exit 1
fi

# Run database migrations
print_status "Running database setup..."
docker-compose -f docker-compose.prod.yml exec -T geriatrics-app npm run migrate || print_warning "Migration failed or not configured"

# Display access information
print_success "Deployment completed successfully!"
echo
echo "🎉 Geriatrics Platform v2.0 is now running!"
echo
echo "📍 Access Points:"
echo "  • Web App: https://geriatrics.shaare-zedek.org.il"
echo "  • Admin Panel: https://geriatrics.shaare-zedek.org.il/admin"
echo "  • Grafana Monitoring: http://localhost:3001"
echo "  • Elasticsearch: http://localhost:9200"
echo
echo "📊 Service Status:"
docker-compose -f docker-compose.prod.yml ps
echo
echo "📝 Useful Commands:"
echo "  • View logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "  • Stop services: docker-compose -f docker-compose.prod.yml down"
echo "  • Update: ./deploy-production.sh"
echo "  • Backup: docker-compose -f docker-compose.prod.yml exec backup /usr/local/bin/backup.sh"
echo
print_warning "Remember to:"
echo "  1. Replace self-signed certificates with proper SSL certificates"
echo "  2. Configure firewall rules for ports 80, 443"
echo "  3. Set up regular backups"
echo "  4. Monitor logs and metrics"
echo
print_success "Ready for production use! 🚀"