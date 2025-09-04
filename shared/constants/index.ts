// 공통 상수 정의

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  PROFILE: '/api/auth/profile',
  
  // Tools
  TOOLS: '/api/tools',
  TOOL_BY_ID: (id: string) => `/api/tools/${id}`,
  TOOL_RATINGS: (id: string) => `/api/tools/${id}/ratings`,
  
  // Discussions
  DISCUSSIONS: '/api/discussions',
  TOOL_DISCUSSIONS: (toolId: string) => `/api/tools/${toolId}/discussions`,
  DISCUSSION_REPLIES: (id: string) => `/api/discussions/${id}/replies`,
  
  // Votes
  VOTES: '/api/votes',
  
  // Search
  SEARCH: '/api/search',
  
  // Users
  USERS: '/api/users',
  USER_BY_ID: (id: string) => `/api/users/${id}`
} as const;

export const WEBSOCKET_EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
  TOOL_UPDATE: 'tool_update',
  NEW_RATING: 'new_rating',
  NEW_DISCUSSION: 'new_discussion',
  NEW_REPLY: 'new_reply',
  VOTE_UPDATE: 'vote_update',
  USER_TYPING: 'user_typing',
  REAL_TIME_EDIT: 'real_time_edit'
} as const;

export const RATING_WEIGHTS = {
  FUNCTIONALITY: 0.4,
  VALUE_FOR_MONEY: 0.25,
  EASE_OF_USE: 0.2,
  RELIABILITY: 0.1,
  DESIGN: 0.05
} as const;

export const TRUST_SCORE_MULTIPLIERS = {
  NEW_USER: 0.5,
  REGULAR_USER: 1.0,
  VERIFIED_USER: 1.5,
  EXPERT_USER: 2.0,
  MODERATOR: 2.5
} as const;

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  DEFAULT_PAGE: 1
} as const;

export const TOOL_CATEGORIES = {
  AI_WRITING: { label: 'AI Writing', color: '#3B82F6' },
  AI_IMAGE: { label: 'AI Image', color: '#8B5CF6' },
  AI_VIDEO: { label: 'AI Video', color: '#EC4899' },
  AI_AUDIO: { label: 'AI Audio', color: '#F59E0B' },
  AI_CODE: { label: 'AI Code', color: '#10B981' },
  AI_DATA: { label: 'AI Data', color: '#6366F1' },
  PRODUCTIVITY: { label: 'Productivity', color: '#EF4444' },
  DESIGN: { label: 'Design', color: '#14B8A6' },
  DEVELOPMENT: { label: 'Development', color: '#F97316' },
  MARKETING: { label: 'Marketing', color: '#84CC16' },
  OTHER: { label: 'Other', color: '#6B7280' }
} as const;

export const VOTE_TYPES = {
  UP: { label: '👍', description: 'Helpful' },
  DOWN: { label: '👎', description: 'Not Helpful' },
  HELPFUL: { label: '💡', description: 'Insightful' },
  LOVE: { label: '❤️', description: 'Love it' },
  FIRE: { label: '🔥', description: 'Amazing' },
  AMAZING: { label: '😮', description: 'Mind-blown' }
} as const;

export const DISCUSSION_TYPES = {
  GENERAL: { label: 'General', icon: '💬' },
  QUESTION: { label: 'Question', icon: '❓' },
  UPDATE: { label: 'Update', icon: '📢' },
  ISSUE: { label: 'Issue', icon: '⚠️' }
} as const;