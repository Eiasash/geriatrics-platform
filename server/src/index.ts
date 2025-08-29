/**
 * Shaare Zedek Geriatrics Platform - Enterprise Server
 * Production-grade medical software with HIPAA compliance
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import passport from 'passport';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import winston from 'winston';

import { DatabaseService } from './services/DatabaseService';
import { RedisService } from './services/RedisService';
import { ClinicalDecisionEngine } from './services/ClinicalDecisionEngine';
import { IsraeliHealthcareService } from './services/IsraeliHealthcareService';
import { SecurityService } from './services/SecurityService';
import { AuditService } from './services/AuditService';
import { ElasticsearchService } from './services/ElasticsearchService';

import authRoutes from './routes/auth';
import clinicalRoutes from './routes/clinical';
import medicationRoutes from './routes/medication';
import fellowshipRoutes from './routes/fellowship';
import researchRoutes from './routes/research';
import integrationRoutes from './routes/integration';
import analyticsRoutes from './routes/analytics';
import healthRoutes from './routes/health';

import { authMiddleware } from './middleware/auth';
import { validationMiddleware } from './middleware/validation';
import { auditMiddleware } from './middleware/audit';
import { errorHandler } from './middleware/errorHandler';
import { hipaaLogger } from './middleware/hipaaLogger';

// Load environment variables
dotenv.config();

// Configure logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'shaare-zedek-geriatrics',
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version
  },
  transports: [
    new winston.transports.File({ filename: '/app/logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: '/app/logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

class GeriatricsServer {
  private app: express.Application;
  private server: any;
  private io: Server;
  private databaseService: DatabaseService;
  private redisService: RedisService;
  private clinicalDecisionEngine: ClinicalDecisionEngine;
  private israeliHealthcareService: IsraeliHealthcareService;
  private securityService: SecurityService;
  private auditService: AuditService;
  private elasticsearchService: ElasticsearchService;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
        credentials: true
      }
    });

    this.initializeServices();
    this.configureMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
    this.setupSocketIO();
  }

  private async initializeServices(): Promise<void> {
    try {
      logger.info('Initializing enterprise services...');

      // Initialize core services
      this.databaseService = new DatabaseService();
      await this.databaseService.initialize();
      
      this.redisService = new RedisService();
      await this.redisService.initialize();

      this.elasticsearchService = new ElasticsearchService();
      await this.elasticsearchService.initialize();

      // Initialize clinical services
      this.clinicalDecisionEngine = new ClinicalDecisionEngine(
        this.databaseService,
        this.redisService,
        this.elasticsearchService
      );
      await this.clinicalDecisionEngine.initialize();

      this.israeliHealthcareService = new IsraeliHealthcareService();
      await this.israeliHealthcareService.initialize();

      // Initialize security services
      this.securityService = new SecurityService();
      this.auditService = new AuditService(this.elasticsearchService);

      logger.info('All enterprise services initialized successfully');

    } catch (error) {
      logger.error('Failed to initialize services:', error);
      process.exit(1);
    }
  }

  private configureMiddleware(): void {
    // Security middleware
    this.app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https:"],
          scriptSrc: ["'self'"],
          connectSrc: ["'self'", "wss:", "https:"],
          frameSrc: ["'none'"],
          objectSrc: ["'none'"]
        }
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
      }
    }));

    // CORS configuration for Israeli healthcare integration
    this.app.use(cors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          process.env.CORS_ORIGIN,
          'https://geriatrics.shaarezedek.org.il',
          'https://emr.shaarezedek.org.il',
          'https://api.clalit.co.il',
          'https://api.maccabi4u.co.il',
          'https://api.leumit.co.il'
        ].filter(Boolean);

        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-API-Key']
    }));

    // Rate limiting with different tiers
    const generalLimiter = rateLimit({
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '900000'), // 15 minutes
      max: parseInt(process.env.RATE_LIMIT_REQUESTS || '100'),
      message: 'Too many requests from this IP, please try again later.',
      standardHeaders: true,
      legacyHeaders: false,
    });

    const strictLimiter = rateLimit({
      windowMs: 900000, // 15 minutes
      max: parseInt(process.env.RATE_LIMIT_STRICT_ENDPOINTS || '10'),
      message: 'Too many requests to this endpoint, please try again later.',
      standardHeaders: true,
      legacyHeaders: false,
    });

    this.app.use('/api/', generalLimiter);
    this.app.use('/api/auth/', strictLimiter);
    this.app.use('/api/clinical/decision', strictLimiter);

    // Body parsing and compression
    this.app.use(compression({
      threshold: parseInt(process.env.COMPRESSION_THRESHOLD || '1024')
    }));
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Logging with HIPAA compliance
    this.app.use(morgan('combined', {
      stream: {
        write: (message: string) => logger.info(message.trim())
      }
    }));

    // HIPAA compliant audit logging
    this.app.use(hipaaLogger(this.auditService));

    // Passport initialization
    this.app.use(passport.initialize());

    // Custom security middleware
    this.app.use(this.securityService.validateRequest.bind(this.securityService));
  }

  private setupRoutes(): void {
    // Health check endpoint (public)
    this.app.use('/api/health', healthRoutes);

    // Authentication routes (public)
    this.app.use('/api/auth', authRoutes(this.databaseService, this.securityService));

    // Protected routes requiring authentication
    this.app.use('/api/clinical', authMiddleware, clinicalRoutes(this.clinicalDecisionEngine));
    this.app.use('/api/medication', authMiddleware, medicationRoutes(this.clinicalDecisionEngine));
    this.app.use('/api/fellowship', authMiddleware, fellowshipRoutes(this.databaseService));
    this.app.use('/api/research', authMiddleware, researchRoutes(this.elasticsearchService));
    this.app.use('/api/integration', authMiddleware, integrationRoutes(this.israeliHealthcareService));
    this.app.use('/api/analytics', authMiddleware, analyticsRoutes(this.elasticsearchService));

    // Audit middleware for all protected routes
    this.app.use('/api', auditMiddleware(this.auditService));

    // Serve static files for PWA
    this.app.use(express.static('client', {
      maxAge: '1d',
      etag: true
    }));

    // SPA fallback
    this.app.get('*', (req, res) => {
      if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API endpoint not found' });
      }
      res.sendFile('index.html', { root: 'client' });
    });
  }

  private setupErrorHandling(): void {
    // Global error handler with HIPAA compliance
    this.app.use(errorHandler(logger, this.auditService));

    // Handle uncaught exceptions
    process.on('uncaughtException', (error: Error) => {
      logger.error('Uncaught Exception:', error);
      this.gracefulShutdown('SIGTERM');
    });

    process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
      logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
      this.gracefulShutdown('SIGTERM');
    });

    // Handle graceful shutdown
    process.on('SIGTERM', () => this.gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => this.gracefulShutdown('SIGINT'));
  }

  private setupSocketIO(): void {
    // Real-time features for clinical decision support
    this.io.use(async (socket, next) => {
      try {
        // Authenticate socket connection
        const token = socket.handshake.auth.token;
        const user = await this.securityService.verifyToken(token);
        socket.data.user = user;
        next();
      } catch (error) {
        next(new Error('Authentication error'));
      }
    });

    this.io.on('connection', (socket) => {
      const user = socket.data.user;
      logger.info(`User ${user.id} connected to real-time services`);

      // Join user to their fellowship cohort room
      if (user.fellowshipYear) {
        socket.join(`fellowship-${user.fellowshipYear}`);
      }

      // Join user to their department room
      socket.join(`department-${user.department}`);

      // Handle clinical decision support events
      socket.on('request-clinical-decision', async (data) => {
        try {
          const decision = await this.clinicalDecisionEngine.processDecisionRequest(data, user);
          socket.emit('clinical-decision-response', decision);
          
          // Log the clinical decision request
          await this.auditService.logClinicalDecision(user.id, data, decision);
        } catch (error) {
          socket.emit('clinical-decision-error', { error: error.message });
        }
      });

      // Handle medication interaction checks
      socket.on('check-medication-interactions', async (medications) => {
        try {
          const interactions = await this.clinicalDecisionEngine.checkMedicationInteractions(medications);
          socket.emit('medication-interactions-response', interactions);
        } catch (error) {
          socket.emit('medication-interactions-error', { error: error.message });
        }
      });

      // Handle fellowship milestone updates
      socket.on('update-fellowship-milestone', async (milestone) => {
        try {
          await this.databaseService.updateFellowshipMilestone(user.id, milestone);
          this.io.to(`fellowship-${user.fellowshipYear}`).emit('milestone-updated', {
            userId: user.id,
            milestone
          });
        } catch (error) {
          socket.emit('milestone-update-error', { error: error.message });
        }
      });

      socket.on('disconnect', () => {
        logger.info(`User ${user.id} disconnected from real-time services`);
      });
    });
  }

  private async gracefulShutdown(signal: string): Promise<void> {
    logger.info(`Received ${signal}, starting graceful shutdown...`);

    try {
      // Stop accepting new connections
      this.server.close(() => {
        logger.info('HTTP server closed');
      });

      // Close Socket.IO connections
      this.io.close(() => {
        logger.info('Socket.IO server closed');
      });

      // Close database connections
      await this.databaseService.close();
      await this.redisService.close();
      await this.elasticsearchService.close();

      logger.info('Graceful shutdown completed');
      process.exit(0);
    } catch (error) {
      logger.error('Error during graceful shutdown:', error);
      process.exit(1);
    }
  }

  public async start(): Promise<void> {
    const port = process.env.PORT || 8080;
    
    this.server.listen(port, () => {
      logger.info(`🏥 Shaare Zedek Geriatrics Platform running on port ${port}`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV}`);
      logger.info(`🇮🇱 Israeli Healthcare Integration: Enabled`);
      logger.info(`🔒 HIPAA Compliance: Active`);
      logger.info(`📊 Real-time Analytics: Enabled`);
      logger.info(`🎓 Fellowship Training: Active`);
    });
  }
}

// Start the server
async function bootstrap() {
  try {
    const server = new GeriatricsServer();
    await server.start();
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();