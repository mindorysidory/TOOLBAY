import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

// Import configurations and middleware
import { logger } from './lib/logger';
import { errorHandler } from './middleware/errorHandler';
import { ipFingerprint } from './middleware/ipFingerprint';
import { requestLogger } from './middleware/requestLogger';

// Import routes
import toolsRoutes from './routes/tools';
import opinionsRoutes from './routes/opinions';
import votesRoutes from './routes/votes';
import categoriesRoutes from './routes/categories';
import usersRoutes from './routes/users';
import statsRoutes from './routes/stats';

// Import socket handlers
import { setupSocketHandlers } from './lib/socket';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  }
});

const PORT = process.env.PORT || 3001;

// =============================================
// MIDDLEWARE CONFIGURATION
// =============================================

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5173'];
    
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true
}));

// Compression middleware
app.use(compression());

// Request parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) }
  }));
}
app.use(requestLogger);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: {
    error: 'Too many requests from this IP, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// IP fingerprinting middleware
app.use('/api', ipFingerprint);

// =============================================
// ROUTES CONFIGURATION
// =============================================

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API routes
app.use('/api/tools', toolsRoutes);
app.use('/api/opinions', opinionsRoutes);
app.use('/api/votes', votesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/stats', statsRoutes);

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'TOOLBAY API',
    version: '1.0.0',
    description: 'Collective Intelligence Platform for AI Tools',
    endpoints: {
      tools: '/api/tools',
      opinions: '/api/opinions',
      votes: '/api/votes',
      categories: '/api/categories',
      users: '/api/users',
      stats: '/api/stats'
    },
    documentation: 'https://docs.toolbay.dev',
    support: 'https://github.com/toolbay/toolbay/issues'
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The requested route ${req.originalUrl} does not exist`,
    code: 'ROUTE_NOT_FOUND'
  });
});

// =============================================
// ERROR HANDLING
// =============================================
app.use(errorHandler);

// =============================================
// SOCKET.IO SETUP
// =============================================
setupSocketHandlers(io);

// =============================================
// SERVER STARTUP
// =============================================

// Graceful shutdown handling
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the server
server.listen(PORT, () => {
  logger.info(`🚀 TOOLBAY API Server started on port ${PORT}`);
  logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`📊 Health check: http://localhost:${PORT}/health`);
  logger.info(`📚 API docs: http://localhost:${PORT}/api`);
  
  if (process.env.NODE_ENV === 'development') {
    logger.info(`🔧 Frontend URL: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`);
  }
});

export { app, server, io };