/**
 * Redis Service - High-performance caching and session management
 * Supports Redis Sentinel for high availability
 */

import { Redis, RedisOptions, Cluster } from 'ioredis';
import winston from 'winston';

export class RedisService {
  private logger: winston.Logger;
  private redis: Redis | Cluster;
  private subscriber: Redis | Cluster;
  private publisher: Redis | Cluster;
  private isCluster: boolean = false;

  constructor() {
    this.logger = winston.createLogger({
      service: 'redis-service'
    });
  }

  async initialize(): Promise<void> {
    this.logger.info('Initializing Redis Service...');

    const redisConfig: RedisOptions = {
      retryDelayOnFailover: 100,
      enableReadyCheck: false,
      maxRetriesPerRequest: null,
      lazyConnect: true,
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
      connectTimeout: 10000,
      commandTimeout: 5000,
    };

    // Check if using Redis Sentinel for high availability
    if (process.env.REDIS_SENTINEL_PASSWORD) {
      this.logger.info('Configuring Redis Sentinel for high availability...');
      
      const sentinelConfig = {
        ...redisConfig,
        sentinels: [
          { host: 'redis-sentinel', port: 26379 }
        ],
        name: 'mymaster',
        sentinelPassword: process.env.REDIS_SENTINEL_PASSWORD,
        role: 'master' as const
      };

      this.redis = new Redis(sentinelConfig);
      this.subscriber = new Redis({ ...sentinelConfig, role: 'slave' });
      this.publisher = new Redis(sentinelConfig);
    } else {
      // Single Redis instance
      const singleConfig = {
        ...redisConfig,
        host: process.env.REDIS_HOST || 'redis-primary',
        port: parseInt(process.env.REDIS_PORT || '6379')
      };

      this.redis = new Redis(singleConfig);
      this.subscriber = new Redis(singleConfig);
      this.publisher = new Redis(singleConfig);
    }

    // Setup event listeners
    this.setupEventListeners();

    // Test connection
    await this.redis.connect();
    await this.subscriber.connect();
    await this.publisher.connect();

    this.logger.info('Redis Service initialized successfully');
  }

  private setupEventListeners(): void {
    this.redis.on('connect', () => {
      this.logger.info('Redis connected');
    });

    this.redis.on('ready', () => {
      this.logger.info('Redis ready');
    });

    this.redis.on('error', (error) => {
      this.logger.error('Redis error:', error);
    });

    this.redis.on('close', () => {
      this.logger.warn('Redis connection closed');
    });

    this.redis.on('reconnecting', () => {
      this.logger.info('Redis reconnecting...');
    });
  }

  // Basic Cache Operations
  async get(key: string): Promise<string | null> {
    try {
      const value = await this.redis.get(this.prefixKey(key));
      return value;
    } catch (error) {
      this.logger.error(`Error getting key ${key}:`, error);
      return null;
    }
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<boolean> {
    try {
      const prefixedKey = this.prefixKey(key);
      
      if (ttlSeconds) {
        await this.redis.setex(prefixedKey, ttlSeconds, value);
      } else {
        await this.redis.set(prefixedKey, value);
      }
      
      return true;
    } catch (error) {
      this.logger.error(`Error setting key ${key}:`, error);
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      const result = await this.redis.del(this.prefixKey(key));
      return result > 0;
    } catch (error) {
      this.logger.error(`Error deleting key ${key}:`, error);
      return false;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.redis.exists(this.prefixKey(key));
      return result === 1;
    } catch (error) {
      this.logger.error(`Error checking key existence ${key}:`, error);
      return false;
    }
  }

  // JSON Operations
  async setJSON(key: string, value: any, ttlSeconds?: number): Promise<boolean> {
    try {
      return await this.set(key, JSON.stringify(value), ttlSeconds);
    } catch (error) {
      this.logger.error(`Error setting JSON key ${key}:`, error);
      return false;
    }
  }

  async getJSON(key: string): Promise<any | null> {
    try {
      const value = await this.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      this.logger.error(`Error getting JSON key ${key}:`, error);
      return null;
    }
  }

  // Hash Operations (useful for user sessions)
  async hset(key: string, field: string, value: string): Promise<boolean> {
    try {
      await this.redis.hset(this.prefixKey(key), field, value);
      return true;
    } catch (error) {
      this.logger.error(`Error setting hash ${key}.${field}:`, error);
      return false;
    }
  }

  async hget(key: string, field: string): Promise<string | null> {
    try {
      return await this.redis.hget(this.prefixKey(key), field);
    } catch (error) {
      this.logger.error(`Error getting hash ${key}.${field}:`, error);
      return null;
    }
  }

  async hgetall(key: string): Promise<Record<string, string>> {
    try {
      return await this.redis.hgetall(this.prefixKey(key));
    } catch (error) {
      this.logger.error(`Error getting all hash values for ${key}:`, error);
      return {};
    }
  }

  async hdel(key: string, field: string): Promise<boolean> {
    try {
      const result = await this.redis.hdel(this.prefixKey(key), field);
      return result > 0;
    } catch (error) {
      this.logger.error(`Error deleting hash ${key}.${field}:`, error);
      return false;
    }
  }

  // List Operations (useful for queues)
  async lpush(key: string, value: string): Promise<number> {
    try {
      return await this.redis.lpush(this.prefixKey(key), value);
    } catch (error) {
      this.logger.error(`Error pushing to list ${key}:`, error);
      return 0;
    }
  }

  async rpop(key: string): Promise<string | null> {
    try {
      return await this.redis.rpop(this.prefixKey(key));
    } catch (error) {
      this.logger.error(`Error popping from list ${key}:`, error);
      return null;
    }
  }

  async llen(key: string): Promise<number> {
    try {
      return await this.redis.llen(this.prefixKey(key));
    } catch (error) {
      this.logger.error(`Error getting list length ${key}:`, error);
      return 0;
    }
  }

  // Set Operations (useful for tracking unique items)
  async sadd(key: string, member: string): Promise<boolean> {
    try {
      const result = await this.redis.sadd(this.prefixKey(key), member);
      return result > 0;
    } catch (error) {
      this.logger.error(`Error adding to set ${key}:`, error);
      return false;
    }
  }

  async sismember(key: string, member: string): Promise<boolean> {
    try {
      const result = await this.redis.sismember(this.prefixKey(key), member);
      return result === 1;
    } catch (error) {
      this.logger.error(`Error checking set membership ${key}:`, error);
      return false;
    }
  }

  async smembers(key: string): Promise<string[]> {
    try {
      return await this.redis.smembers(this.prefixKey(key));
    } catch (error) {
      this.logger.error(`Error getting set members ${key}:`, error);
      return [];
    }
  }

  // Session Management
  async createSession(userId: string, sessionData: any, ttlSeconds: number = 86400): Promise<string> {
    try {
      const sessionId = this.generateSessionId();
      const sessionKey = `session:${sessionId}`;
      
      const sessionInfo = {
        userId,
        createdAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        ...sessionData
      };

      await this.setJSON(sessionKey, sessionInfo, ttlSeconds);
      
      // Track user sessions
      await this.sadd(`user_sessions:${userId}`, sessionId);
      
      return sessionId;
    } catch (error) {
      this.logger.error('Error creating session:', error);
      throw error;
    }
  }

  async getSession(sessionId: string): Promise<any | null> {
    try {
      const sessionKey = `session:${sessionId}`;
      const session = await this.getJSON(sessionKey);
      
      if (session) {
        // Update last activity
        session.lastActivity = new Date().toISOString();
        await this.setJSON(sessionKey, session, 86400); // Refresh TTL
      }
      
      return session;
    } catch (error) {
      this.logger.error('Error getting session:', error);
      return null;
    }
  }

  async destroySession(sessionId: string): Promise<boolean> {
    try {
      const sessionKey = `session:${sessionId}`;
      const session = await this.getJSON(sessionKey);
      
      if (session) {
        // Remove from user sessions
        await this.redis.srem(`user_sessions:${session.userId}`, sessionId);
      }
      
      return await this.del(sessionKey);
    } catch (error) {
      this.logger.error('Error destroying session:', error);
      return false;
    }
  }

  async destroyUserSessions(userId: string): Promise<boolean> {
    try {
      const sessionIds = await this.smembers(`user_sessions:${userId}`);
      
      if (sessionIds.length > 0) {
        const sessionKeys = sessionIds.map(id => this.prefixKey(`session:${id}`));
        await this.redis.del(...sessionKeys);
      }
      
      await this.del(`user_sessions:${userId}`);
      return true;
    } catch (error) {
      this.logger.error('Error destroying user sessions:', error);
      return false;
    }
  }

  // Rate Limiting
  async checkRateLimit(
    key: string, 
    windowSeconds: number, 
    maxRequests: number
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    try {
      const rateLimitKey = `rate_limit:${key}`;
      const now = Date.now();
      const windowStart = now - (windowSeconds * 1000);
      
      // Use Redis pipeline for atomic operations
      const pipeline = this.redis.pipeline();
      pipeline.zremrangebyscore(rateLimitKey, '-inf', windowStart);
      pipeline.zcount(rateLimitKey, windowStart, '+inf');
      pipeline.zadd(rateLimitKey, now, now);
      pipeline.expire(rateLimitKey, windowSeconds);
      
      const results = await pipeline.exec();
      const currentRequests = results?.[1]?.[1] as number || 0;
      
      const allowed = currentRequests < maxRequests;
      const remaining = Math.max(0, maxRequests - currentRequests - 1);
      const resetTime = now + (windowSeconds * 1000);
      
      if (!allowed) {
        // Remove the request we just added if it's not allowed
        await this.redis.zrem(rateLimitKey, now);
      }
      
      return { allowed, remaining, resetTime };
    } catch (error) {
      this.logger.error('Error checking rate limit:', error);
      // Fail open - allow the request if rate limiting fails
      return { allowed: true, remaining: maxRequests - 1, resetTime: Date.now() + (windowSeconds * 1000) };
    }
  }

  // Pub/Sub for real-time features
  async publish(channel: string, message: string): Promise<boolean> {
    try {
      const result = await this.publisher.publish(channel, message);
      return result > 0;
    } catch (error) {
      this.logger.error(`Error publishing to channel ${channel}:`, error);
      return false;
    }
  }

  async subscribe(channel: string, callback: (message: string) => void): Promise<void> {
    try {
      await this.subscriber.subscribe(channel);
      this.subscriber.on('message', (receivedChannel, message) => {
        if (receivedChannel === channel) {
          callback(message);
        }
      });
    } catch (error) {
      this.logger.error(`Error subscribing to channel ${channel}:`, error);
    }
  }

  async unsubscribe(channel: string): Promise<void> {
    try {
      await this.subscriber.unsubscribe(channel);
    } catch (error) {
      this.logger.error(`Error unsubscribing from channel ${channel}:`, error);
    }
  }

  // Clinical Decision Caching
  async cacheDecision(patientId: string, decisionType: string, decision: any, ttlSeconds: number = 3600): Promise<boolean> {
    const key = `clinical_decision:${patientId}:${decisionType}`;
    return await this.setJSON(key, decision, ttlSeconds);
  }

  async getCachedDecision(patientId: string, decisionType: string): Promise<any | null> {
    const key = `clinical_decision:${patientId}:${decisionType}`;
    return await this.getJSON(key);
  }

  // Medication Interaction Caching
  async cacheMedicationInteractions(medicationHash: string, interactions: any[], ttlSeconds: number = 86400): Promise<boolean> {
    const key = `medication_interactions:${medicationHash}`;
    return await this.setJSON(key, interactions, ttlSeconds);
  }

  async getCachedMedicationInteractions(medicationHash: string): Promise<any[] | null> {
    const key = `medication_interactions:${medicationHash}`;
    return await this.getJSON(key);
  }

  // User Activity Tracking
  async trackUserActivity(userId: string, activity: string): Promise<void> {
    try {
      const activityKey = `user_activity:${userId}`;
      const activityData = {
        activity,
        timestamp: new Date().toISOString()
      };
      
      await this.lpush(activityKey, JSON.stringify(activityData));
      
      // Keep only last 100 activities
      await this.redis.ltrim(activityKey, 0, 99);
      
      // Set expiry for the activity list
      await this.redis.expire(activityKey, 86400 * 7); // 7 days
    } catch (error) {
      this.logger.error('Error tracking user activity:', error);
    }
  }

  async getUserActivityLog(userId: string, limit: number = 50): Promise<any[]> {
    try {
      const activityKey = `user_activity:${userId}`;
      const activities = await this.redis.lrange(activityKey, 0, limit - 1);
      
      return activities.map(activity => JSON.parse(activity));
    } catch (error) {
      this.logger.error('Error getting user activity log:', error);
      return [];
    }
  }

  // Health Check
  async healthCheck(): Promise<boolean> {
    try {
      const pong = await this.redis.ping();
      return pong === 'PONG';
    } catch (error) {
      this.logger.error('Redis health check failed:', error);
      return false;
    }
  }

  // Utility Methods
  private prefixKey(key: string): string {
    return `geriatrics:${key}`;
  }

  private generateSessionId(): string {
    return require('crypto').randomBytes(32).toString('hex');
  }

  async close(): Promise<void> {
    this.logger.info('Closing Redis connections...');
    
    try {
      await this.redis.disconnect();
      await this.subscriber.disconnect();
      await this.publisher.disconnect();
      
      this.logger.info('Redis connections closed');
    } catch (error) {
      this.logger.error('Error closing Redis connections:', error);
    }
  }

  // Statistics and Monitoring
  async getStats(): Promise<any> {
    try {
      const info = await this.redis.info();
      const memory = await this.redis.info('memory');
      const stats = await this.redis.info('stats');
      
      return {
        info: this.parseRedisInfo(info),
        memory: this.parseRedisInfo(memory),
        stats: this.parseRedisInfo(stats)
      };
    } catch (error) {
      this.logger.error('Error getting Redis stats:', error);
      return {};
    }
  }

  private parseRedisInfo(info: string): any {
    const result: any = {};
    
    info.split('\r\n').forEach(line => {
      if (line && !line.startsWith('#')) {
        const [key, value] = line.split(':');
        if (key && value) {
          result[key] = isNaN(Number(value)) ? value : Number(value);
        }
      }
    });
    
    return result;
  }
}