import { createClient } from 'redis';
import { config } from './index';

export const redisClient = createClient({
  url: config.redis.url,
});

export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
    console.log('✅ Redis connected successfully');
  } catch (error) {
    console.error('❌ Unable to connect to Redis:', error);
    process.exit(1);
  }
};

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

redisClient.on('ready', () => {
  console.log('Redis is ready');
});

redisClient.on('reconnecting', () => {
  console.log('Redis reconnecting...');
});