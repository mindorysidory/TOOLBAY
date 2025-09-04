import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { getOrCreateUser } from '../lib/supabase';
import { logger } from '../lib/logger';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
      userFingerprint?: string;
    }
  }
}

export const ipFingerprint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract IP address
    const ip = req.ip || 
               req.connection.remoteAddress || 
               req.socket.remoteAddress ||
               (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
               '127.0.0.1';

    // Extract user agent
    const userAgent = req.get('User-Agent') || 'unknown';
    
    // Extract additional headers for fingerprinting
    const acceptLanguage = req.get('Accept-Language') || '';
    const acceptEncoding = req.get('Accept-Encoding') || '';
    const connection = req.get('Connection') || '';

    // Create unique fingerprint from IP and headers
    const fingerprintData = `${ip}|${userAgent}|${acceptLanguage}|${acceptEncoding}|${connection}`;
    const fingerprint = crypto
      .createHash('sha256')
      .update(fingerprintData)
      .digest('hex')
      .substring(0, 32); // Use first 32 characters for shorter fingerprint

    // Store fingerprint for use in routes
    req.userFingerprint = fingerprint;

    // Get or create user based on fingerprint
    try {
      const user = await getOrCreateUser(fingerprint);
      req.user = user;
      
      logger.debug('User identified:', {
        fingerprint: fingerprint.substring(0, 8) + '...', // Log partial fingerprint for privacy
        userId: user.id,
        trustScore: user.trust_score,
        isNewUser: user.created_at === user.last_active
      });
    } catch (error) {
      logger.error('Failed to get/create user:', error);
      // Continue without user - some endpoints don't require user context
    }

    next();
  } catch (error) {
    logger.error('IP fingerprinting failed:', error);
    next(error);
  }
};

// Helper function to generate human-readable username from fingerprint
export const generateUsername = (fingerprint: string): string => {
  // Generate consistent username from fingerprint
  const hash = parseInt(fingerprint.substring(0, 8), 16);
  
  const adjectives = [
    'Tech', 'Smart', 'Creative', 'Digital', 'Pro', 'Expert', 'Quick', 'Modern',
    'Bright', 'Sharp', 'Swift', 'Cool', 'Alpha', 'Beta', 'Gamma', 'Delta'
  ];
  
  const nouns = [
    'User', 'Developer', 'Designer', 'Reviewer', 'Tester', 'Builder', 'Maker', 'Creator',
    'Coder', 'Hacker', 'Ninja', 'Wizard', 'Master', 'Guru', 'Expert', 'Pioneer'
  ];
  
  const adj = adjectives[hash % adjectives.length];
  const noun = nouns[Math.floor(hash / adjectives.length) % nouns.length];
  const num = (hash % 1000).toString().padStart(3, '0');
  
  return `${adj}${noun}${num}`;
};

// Middleware to require user context
export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'User context required',
        code: 'USER_REQUIRED',
        statusCode: 401
      }
    });
  }
  next();
};

// Middleware to check user trust score
export const requireTrustScore = (minimumScore: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.trust_score < minimumScore) {
      return res.status(403).json({
        success: false,
        error: {
          message: `Minimum trust score of ${minimumScore} required`,
          code: 'INSUFFICIENT_TRUST_SCORE',
          statusCode: 403,
          details: {
            required: minimumScore,
            current: req.user?.trust_score || 0
          }
        }
      });
    }
    next();
  };
};

// Middleware to prevent banned users
export const preventBanned = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.is_banned) {
    return res.status(403).json({
      success: false,
      error: {
        message: 'Account has been banned',
        code: 'ACCOUNT_BANNED',
        statusCode: 403,
        details: {
          reason: req.user.ban_reason || 'Violation of community guidelines'
        }
      }
    });
  }
  next();
};

export default ipFingerprint;