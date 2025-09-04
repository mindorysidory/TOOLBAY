// TOOLBAY API Service - Backend 연결
const API_BASE_URL = 'http://localhost:3001/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  favicon: string;
  category_id: string;
  pricing: string;
  average_rating: number;
  total_votes: number;
  total_opinions: number;
  tags: string[];
  is_sponsored: boolean;
  created_at: string;
  categories?: {
    id: string;
    name: string;
    description: string;
  };
  opinions?: Opinion[];
}

interface Opinion {
  id: string;
  content: string;
  rating?: number;
  vote_score: number;
  created_at: string;
  users: {
    trust_score: number;
  };
}

interface Category {
  id: string;
  name: string;
  description: string;
  sort_order: number;
}

// API 요청 함수들
export const apiService = {
  // 카테고리
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories`);
    const result: ApiResponse<{ categories: Category[] }> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch categories');
    }
    
    return result.data?.categories || [];
  },

  // 도구 목록
  async getTools(params?: {
    category?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<Tool[]> {
    const searchParams = new URLSearchParams();
    
    if (params?.category && params.category !== 'all') {
      searchParams.append('category', params.category);
    }
    if (params?.search) {
      searchParams.append('search', params.search);
    }
    if (params?.limit) {
      searchParams.append('limit', params.limit.toString());
    }
    if (params?.offset) {
      searchParams.append('offset', params.offset.toString());
    }

    const url = `${API_BASE_URL}/tools${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
    const response = await fetch(url);
    const result: ApiResponse<{ tools: Tool[] }> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch tools');
    }
    
    return result.data?.tools || [];
  },

  // 단일 도구 조회
  async getTool(id: string): Promise<Tool> {
    const response = await fetch(`${API_BASE_URL}/tools/${id}`);
    const result: ApiResponse<{ tool: Tool }> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch tool');
    }
    
    if (!result.data?.tool) {
      throw new Error('Tool not found');
    }
    
    return result.data.tool;
  },

  // 도구 생성
  async createTool(toolData: {
    name: string;
    description: string;
    url: string;
    category_id: string;
    pricing: string;
    tags?: string[];
  }): Promise<Tool> {
    const response = await fetch(`${API_BASE_URL}/tools`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toolData),
    });
    
    const result: ApiResponse<{ tool: Tool }> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to create tool');
    }
    
    if (!result.data?.tool) {
      throw new Error('Tool creation failed');
    }
    
    return result.data.tool;
  },

  // 리뷰 작성
  async createOpinion(toolId: string, opinionData: {
    content: string;
    rating?: number;
  }): Promise<Opinion> {
    const response = await fetch(`${API_BASE_URL}/tools/${toolId}/opinions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(opinionData),
    });
    
    const result: ApiResponse<{ opinion: Opinion }> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to create opinion');
    }
    
    if (!result.data?.opinion) {
      throw new Error('Opinion creation failed');
    }
    
    return result.data.opinion;
  },

  // 도구 평점
  async rateTool(toolId: string, rating: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tools/${toolId}/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating }),
    });
    
    const result: ApiResponse<any> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to rate tool');
    }
  },

  // 도구의 의견 목록 조회
  async getOpinions(toolId: string, limit: number = 20, offset: number = 0): Promise<Opinion[]> {
    const searchParams = new URLSearchParams();
    searchParams.append('limit', limit.toString());
    searchParams.append('offset', offset.toString());

    const url = `${API_BASE_URL}/tools/${toolId}/opinions?${searchParams.toString()}`;
    const response = await fetch(url);
    const result: ApiResponse<{ opinions: Opinion[] }> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch opinions');
    }
    
    return result.data?.opinions || [];
  },

  // 의견 투표
  async voteOpinion(opinionId: string, voteType: 'up' | 'down'): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/opinions/${opinionId}/votes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vote_type: voteType }),
    });
    
    const result: ApiResponse<any> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to vote on opinion');
    }
  },
};

export type { Tool, Opinion, Category };