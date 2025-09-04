import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3001', 10),
  
  // Supabase Configuration
  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  },
  
  // Frontend Configuration
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:5173'
  },
  
  // Redis Configuration (for caching and real-time features)
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  },
  
  // JWT Configuration (if needed for sessions)
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'
  },
  
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }
};