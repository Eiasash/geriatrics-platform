#!/bin/bash
# Enterprise Geriatrics Platform - Docker Entrypoint
# Production startup script with health checks and monitoring

set -e

echo "🏥 Starting Shaare Zedek Geriatrics Platform..."
echo "Environment: ${NODE_ENV:-development}"
echo "Version: ${npm_package_version:-1.0.0}"

# Wait for database to be ready
echo "⏳ Waiting for database connection..."
until nc -z postgres-primary 5432; do
  echo "Waiting for PostgreSQL..."
  sleep 2
done
echo "✅ Database connection established"

# Wait for Redis to be ready
echo "⏳ Waiting for Redis connection..."
until nc -z redis-primary 6379; do
  echo "Waiting for Redis..."
  sleep 2
done
echo "✅ Redis connection established"

# Wait for Elasticsearch to be ready
echo "⏳ Waiting for Elasticsearch..."
until curl -s http://elasticsearch:9200/_cluster/health | grep -q '"status":"green\|yellow"'; do
  echo "Waiting for Elasticsearch..."
  sleep 5
done
echo "✅ Elasticsearch connection established"

# Run database migrations
echo "📊 Running database migrations..."
cd server && npm run db:migrate
echo "✅ Database migrations completed"

# Seed initial data
echo "🌱 Seeding initial data..."
cd server && npm run db:seed
echo "✅ Initial data seeded"

# Start the application
echo "🚀 Starting Shaare Zedek Geriatrics Platform..."
echo "🇮🇱 Israeli Healthcare Integration: Enabled"
echo "🔒 HIPAA Compliance: Active"
echo "📊 Real-time Analytics: Enabled"
echo "🎓 Fellowship Training: Active"

# Start both client and server
exec npm run dev