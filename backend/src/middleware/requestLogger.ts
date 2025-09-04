import { Request, Response, NextFunction } from 'express';
import { logger } from '../lib/logger';
import { v4 as uuidv4 } from 'uuid';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  // Generate unique request ID
  const requestId = uuidv4();
  req.id = requestId;

  // Start timer
  const startTime = Date.now();

  // Log request
  if (process.env.ENABLE_REQUEST_LOGGING === 'true') {
    logger.info('Incoming request', {
      requestId,
      method: req.method,
      url: req.url,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      fingerprint: req.userFingerprint?.substring(0, 8) + '...' || 'unknown',
      timestamp: new Date().toISOString()
    });
  }

  // Override res.json to log response
  const originalJson = res.json;
  res.json = function (body: any) {
    const duration = Date.now() - startTime;
    
    if (process.env.ENABLE_REQUEST_LOGGING === 'true') {
      logger.info('Response sent', {
        requestId,
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        responseSize: JSON.stringify(body).length,
        success: res.statusCode < 400
      });
    }

    // Call original json method
    return originalJson.call(this, body);
  };

  // Add request ID to response headers
  res.setHeader('X-Request-ID', requestId);

  next();
};

// Extend Request interface to include id
declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

export default requestLogger;