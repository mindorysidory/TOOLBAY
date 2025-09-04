import { Request, Response, NextFunction } from 'express';
import { logger } from '../lib/logger';

export interface CustomError extends Error {
  statusCode?: number;
  code?: string;
  details?: any;
}

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error
  logger.error('Error occurred:', {
    message: error.message,
    stack: error.stack,
    statusCode: error.statusCode,
    code: error.code,
    url: req.url,
    method: req.method,
    userAgent: req.get('User-Agent'),
    ip: req.ip
  });

  // Default error response
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';
  let code = error.code || 'INTERNAL_SERVER_ERROR';

  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    message = 'Validation failed';
  } else if (error.name === 'CastError') {
    statusCode = 400;
    code = 'INVALID_ID';
    message = 'Invalid ID format';
  } else if (error.name === 'UnauthorizedError') {
    statusCode = 401;
    code = 'UNAUTHORIZED';
    message = 'Unauthorized access';
  } else if (error.name === 'ForbiddenError') {
    statusCode = 403;
    code = 'FORBIDDEN';
    message = 'Access forbidden';
  } else if (error.name === 'NotFoundError') {
    statusCode = 404;
    code = 'NOT_FOUND';
    message = 'Resource not found';
  }

  // Supabase error handling
  if (error.message?.includes('duplicate key value')) {
    statusCode = 409;
    code = 'DUPLICATE_ENTRY';
    message = 'Resource already exists';
  } else if (error.message?.includes('violates foreign key constraint')) {
    statusCode = 400;
    code = 'INVALID_REFERENCE';
    message = 'Invalid reference to related resource';
  } else if (error.message?.includes('violates not-null constraint')) {
    statusCode = 400;
    code = 'MISSING_REQUIRED_FIELD';
    message = 'Required field is missing';
  }

  // Rate limit error
  if (error.message?.includes('Too many requests')) {
    statusCode = 429;
    code = 'RATE_LIMIT_EXCEEDED';
    message = 'Too many requests, please try again later';
  }

  // CORS error
  if (error.message?.includes('Not allowed by CORS')) {
    statusCode = 403;
    code = 'CORS_ERROR';
    message = 'Request not allowed by CORS policy';
  }

  // Response
  const errorResponse: any = {
    success: false,
    error: {
      message,
      code,
      statusCode
    }
  };

  // Add error details in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.stack = error.stack;
    errorResponse.error.details = error.details;
  }

  // Add validation details if available
  if (error.details && statusCode === 400) {
    errorResponse.error.details = error.details;
  }

  res.status(statusCode).json(errorResponse);
};

// Create custom error class
export class ApiError extends Error implements CustomError {
  statusCode: number;
  code: string;
  details?: any;

  constructor(message: string, statusCode = 500, code = 'INTERNAL_SERVER_ERROR', details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.name = 'ApiError';
  }
}

// Async error wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default errorHandler;