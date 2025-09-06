# 🚀 Geriatrics Platform v2.0 - Production Deployment Guide

## Quick Deployment (5 minutes)

```bash
# 1. Navigate to platform directory
cd geriatrics-platform

# 2. Configure environment (IMPORTANT!)
cp .env.production .env.production.local
nano .env.production.local  # Edit with your actual credentials

# 3. Deploy to production
./deploy-production.sh
```

## 📋 Prerequisites

- Docker & Docker Compose installed
- 20GB+ available disk space  
- SSL certificates (self-signed generated if missing)
- Network access to external APIs

## 🔧 Configuration Steps

### 1. Environment Variables
Edit `.env.production` with your actual values:

```bash
# Critical - Replace these!
JWT_SECRET=your-256-bit-secret
ENCRYPTION_KEY=your-32-byte-encryption-key
POSTGRES_PASSWORD=your-secure-db-password
ELASTIC_PASSWORD=your-elastic-password

# API Endpoints - Configure for your hospital
CHAMELEON_API_URL=https://api.chameleon.your-hospital.org.il/v2
PACS_API_URL=https://pacs.your-hospital.org.il/api
```

### 2. SSL Certificates
```bash
# Production certificates (recommended)
sudo mkdir -p /opt/geriatrics/ssl
sudo cp your-cert.pem /opt/geriatrics/ssl/cert.pem
sudo cp your-key.pem /opt/geriatrics/ssl/key.pem

# Or use generated self-signed (development only)
# Script will generate automatically if missing
```

## 🚀 Deployment Commands

### Full Production Deployment
```bash
./deploy-production.sh
```

### Manual Step-by-Step
```bash
# 1. Build containers
docker-compose -f docker-compose.prod.yml build

# 2. Start services
docker-compose -f docker-compose.prod.yml up -d

# 3. Check status
docker-compose -f docker-compose.prod.yml ps
```

## 📊 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| **Main App** | https://localhost | Primary platform |
| **Admin Panel** | https://localhost/admin | Administration |
| **Grafana** | http://localhost:3001 | Monitoring |
| **Elasticsearch** | http://localhost:9200 | Search/Analytics |

## 🔍 Health Checks

```bash
# Check all services
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Test health endpoint
curl -f http://localhost/api/health
```

## 🛠️ Management Commands

### Start/Stop Services
```bash
# Start
docker-compose -f docker-compose.prod.yml up -d

# Stop
docker-compose -f docker-compose.prod.yml down

# Restart specific service
docker-compose -f docker-compose.prod.yml restart geriatrics-app
```

### Database Operations
```bash
# Backup database
docker-compose -f docker-compose.prod.yml exec backup /usr/local/bin/backup.sh

# Database shell
docker-compose -f docker-compose.prod.yml exec postgres-primary psql -U geriatrics_user -d geriatrics_db
```

### Monitoring
```bash
# View resource usage
docker stats

# Service logs
docker-compose -f docker-compose.prod.yml logs -f geriatrics-app

# Database logs
docker-compose -f docker-compose.prod.yml logs -f postgres-primary
```

## 🔐 Security Checklist

- [ ] Change all default passwords in `.env.production`
- [ ] Install proper SSL certificates
- [ ] Configure firewall (ports 80, 443 only)
- [ ] Set up log rotation
- [ ] Configure automated backups
- [ ] Enable monitoring alerts

## 🚨 Troubleshooting

### Common Issues

#### Services Won't Start
```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs

# Check disk space
df -h

# Check memory
free -m
```

#### Database Connection Issues
```bash
# Test database connectivity
docker-compose -f docker-compose.prod.yml exec postgres-primary pg_isready

# Reset database
docker-compose -f docker-compose.prod.yml down
docker volume rm geriatrics-platform_postgres-data
docker-compose -f docker-compose.prod.yml up -d
```

#### SSL Certificate Issues
```bash
# Regenerate self-signed certificates
sudo rm -rf /opt/geriatrics/ssl/*
./deploy-production.sh  # Will regenerate
```

## 📈 Scaling for High Availability

### Load Balancer Configuration
The platform includes Nginx load balancer with:
- SSL termination
- Health check endpoints
- Static file serving
- Request routing

### Database Scaling
- Primary-replica PostgreSQL setup included
- Read queries automatically routed to replica
- Automatic failover with Redis Sentinel

### Horizontal Scaling
```bash
# Scale application containers
docker-compose -f docker-compose.prod.yml up -d --scale geriatrics-app=3
```

## 🔄 Updates & Maintenance

### Platform Updates
```bash
# Pull latest code
git pull origin main

# Redeploy with zero downtime
./deploy-production.sh
```

### Database Migrations
```bash
# Run migrations
docker-compose -f docker-compose.prod.yml exec geriatrics-app npm run migrate
```

### Backup Strategy
- Automated daily backups at 2 AM
- 30-day retention policy
- S3 storage integration
- Database + file system backups

## 🎯 Production Optimization

### Performance Tuning
- Application runs 3 replicas by default
- Redis caching for session management
- Elasticsearch for search operations
- CDN integration ready

### Monitoring Setup
- Prometheus metrics collection
- Grafana dashboards
- Log aggregation with Fluentd
- Health check endpoints

## 📞 Support

For deployment issues:
1. Check logs first: `docker-compose -f docker-compose.prod.yml logs`
2. Verify environment configuration
3. Ensure external API connectivity
4. Contact IT support with specific error messages

---

## 🎉 Success!

After deployment, your Geriatrics Platform v2.0 will be running with:

✅ **Multi-EMR Integration** - Chameleon, Prometheus, PACS, LIS  
✅ **HMO Connectivity** - Clalit, Maccabi, Meuhedet, Leumit  
✅ **Hebrew Voice Recognition** - Medical terminology support  
✅ **WebRTC Telemedicine** - HD video consultations  
✅ **Family Portal** - Real-time patient updates  
✅ **Clinical Decision Support** - Drug interactions, alerts  
✅ **High Availability** - Load balancing, failover  
✅ **Security Compliance** - HIPAA, Israeli regulations  

**Ready for production use at Shaare Zedek Medical Center! 🏥**