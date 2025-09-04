// 공통 타입 정의

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  trustScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  website?: string;
  category: ToolCategory;
  pricing: PricingType;
  tags: string[];
  averageRating: number;
  totalVotes: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Rating {
  id: string;
  toolId: string;
  userId: string;
  functionality: number;
  valueForMoney: number;
  easeOfUse: number;
  reliability: number;
  design: number;
  overallRating: number;
  review?: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface Discussion {
  id: string;
  toolId: string;
  userId: string;
  title: string;
  content: string;
  type: DiscussionType;
  isPinned: boolean;
  votes: number;
  replies: DiscussionReply[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DiscussionReply {
  id: string;
  discussionId: string;
  userId: string;
  content: string;
  parentId?: string;
  votes: number;
  createdAt: Date;
}

export interface Vote {
  id: string;
  userId: string;
  targetId: string;
  targetType: 'tool' | 'discussion' | 'reply';
  type: VoteType;
  createdAt: Date;
}

// Enums
export enum ToolCategory {
  AI_WRITING = 'ai_writing',
  AI_IMAGE = 'ai_image',
  AI_VIDEO = 'ai_video',
  AI_AUDIO = 'ai_audio',
  AI_CODE = 'ai_code',
  AI_DATA = 'ai_data',
  PRODUCTIVITY = 'productivity',
  DESIGN = 'design',
  DEVELOPMENT = 'development',
  MARKETING = 'marketing',
  OTHER = 'other'
}

export enum PricingType {
  FREE = 'free',
  FREEMIUM = 'freemium',
  SUBSCRIPTION = 'subscription',
  ONE_TIME = 'one_time',
  USAGE_BASED = 'usage_based'
}

export enum DiscussionType {
  GENERAL = 'general',
  QUESTION = 'question',
  UPDATE = 'update',
  ISSUE = 'issue'
}

export enum VoteType {
  UP = 'up',
  DOWN = 'down',
  HELPFUL = 'helpful',
  LOVE = 'love',
  FIRE = 'fire',
  AMAZING = 'amazing'
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// WebSocket Message Types
export interface WebSocketMessage {
  type: string;
  data: any;
  userId?: string;
  timestamp: Date;
}

export interface RealTimeEdit {
  toolId: string;
  field: string;
  value: any;
  userId: string;
  timestamp: Date;
}