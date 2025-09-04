// TOOLBAY Types

export const ToolCategory = {
  AI_WRITING: 'ai_writing',
  AI_IMAGE: 'ai_image',
  AI_VIDEO: 'ai_video',
  AI_AUDIO: 'ai_audio',
  AI_CODE: 'ai_code',
  AI_DATA: 'ai_data',
  PRODUCTIVITY: 'productivity',
  DESIGN: 'design',
  DEVELOPMENT: 'development',
  MARKETING: 'marketing',
  OTHER: 'other'
} as const;

export type ToolCategory = typeof ToolCategory[keyof typeof ToolCategory];

export const PricingType = {
  FREE: 'free',
  FREEMIUM: 'freemium',
  SUBSCRIPTION: 'subscription',
  ONE_TIME: 'one_time',
  USAGE_BASED: 'usage_based'
} as const;

export type PricingType = typeof PricingType[keyof typeof PricingType];

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string; // 도구 웹사이트 URL (필수)
  favicon?: string; // 파비콘 URL
  metaTitle?: string; // 웹사이트 제목
  metaDescription?: string; // 웹사이트 설명
  category: ToolCategory;
  pricing: PricingType;
  tags: string[];
  averageRating: number;
  totalVotes: number;
  totalOpinions: number; // 의견 개수
  isSponsored: boolean; // 스폰서드 여부
  sponsoredPosition?: number; // 스폰서드 위치
  createdBy?: string; // 익명이므로 optional
  createdAt: string; // ISO 날짜 문자열
  updatedAt: string; // ISO 날짜 문자열
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  trustScore: number;
  createdAt: Date;
  updatedAt: Date;
}