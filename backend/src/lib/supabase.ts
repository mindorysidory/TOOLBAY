import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

// Service role client for server-side operations (full access)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Anonymous client for public operations
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey);

// Database types (will be auto-generated from Supabase)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          ip_fingerprint: string;
          created_at: string;
          last_active: string;
          trust_score: number;
          total_contributions: number;
          total_votes: number;
          is_banned: boolean;
          ban_reason: string | null;
          metadata: Record<string, any>;
        };
        Insert: {
          id?: string;
          ip_fingerprint: string;
          created_at?: string;
          last_active?: string;
          trust_score?: number;
          total_contributions?: number;
          total_votes?: number;
          is_banned?: boolean;
          ban_reason?: string | null;
          metadata?: Record<string, any>;
        };
        Update: {
          id?: string;
          ip_fingerprint?: string;
          created_at?: string;
          last_active?: string;
          trust_score?: number;
          total_contributions?: number;
          total_votes?: number;
          is_banned?: boolean;
          ban_reason?: string | null;
          metadata?: Record<string, any>;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          icon: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          description?: string | null;
          icon?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          icon?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      tools: {
        Row: {
          id: string;
          name: string;
          description: string;
          url: string;
          favicon: string | null;
          category_id: string | null;
          pricing: string;
          average_rating: number;
          total_votes: number;
          total_opinions: number;
          meta_title: string | null;
          meta_description: string | null;
          tags: string[];
          is_sponsored: boolean;
          is_featured: boolean;
          is_approved: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
          submitted_by: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          url: string;
          favicon?: string | null;
          category_id?: string | null;
          pricing: string;
          average_rating?: number;
          total_votes?: number;
          total_opinions?: number;
          meta_title?: string | null;
          meta_description?: string | null;
          tags?: string[];
          is_sponsored?: boolean;
          is_featured?: boolean;
          is_approved?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          submitted_by?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          url?: string;
          favicon?: string | null;
          category_id?: string | null;
          pricing?: string;
          average_rating?: number;
          total_votes?: number;
          total_opinions?: number;
          meta_title?: string | null;
          meta_description?: string | null;
          tags?: string[];
          is_sponsored?: boolean;
          is_featured?: boolean;
          is_approved?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          submitted_by?: string | null;
        };
      };
      opinions: {
        Row: {
          id: string;
          tool_id: string;
          user_id: string;
          content: string;
          rating: number | null;
          vote_score: number;
          total_votes: number;
          trust_score: number;
          is_flagged: boolean;
          flag_reason: string | null;
          is_approved: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tool_id: string;
          user_id: string;
          content: string;
          rating?: number | null;
          vote_score?: number;
          total_votes?: number;
          trust_score?: number;
          is_flagged?: boolean;
          flag_reason?: string | null;
          is_approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tool_id?: string;
          user_id?: string;
          content?: string;
          rating?: number | null;
          vote_score?: number;
          total_votes?: number;
          trust_score?: number;
          is_flagged?: boolean;
          flag_reason?: string | null;
          is_approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      votes: {
        Row: {
          id: string;
          opinion_id: string;
          user_id: string;
          vote_type: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          opinion_id: string;
          user_id: string;
          vote_type: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          opinion_id?: string;
          user_id?: string;
          vote_type?: string;
          created_at?: string;
        };
      };
      tool_ratings: {
        Row: {
          id: string;
          tool_id: string;
          user_id: string;
          rating: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tool_id: string;
          user_id: string;
          rating: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tool_id?: string;
          user_id?: string;
          rating?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      activity_log: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          entity_type: string;
          entity_id: string;
          metadata: Record<string, any>;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action: string;
          entity_type: string;
          entity_id: string;
          metadata?: Record<string, any>;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          action?: string;
          entity_type?: string;
          entity_id?: string;
          metadata?: Record<string, any>;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      popular_tools: {
        Row: {
          id: string;
          name: string;
          description: string;
          url: string;
          favicon: string | null;
          category_id: string | null;
          pricing: string;
          average_rating: number;
          total_votes: number;
          total_opinions: number;
          category_name: string;
          rank_in_category: number;
        };
      };
      recent_activity: {
        Row: {
          activity_type: string;
          title: string;
          description: string;
          created_at: string;
          user_trust: number;
        };
      };
      tool_stats: {
        Row: {
          category_id: string;
          total_tools: number;
          avg_rating: number;
          total_reviews: number;
        };
      };
    };
  };
}

// Helper functions for common operations
export const getUserByFingerprint = async (fingerprint: string) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('ip_fingerprint', fingerprint)
    .single();
    
  if (error && error.code !== 'PGRST116') { // PGRST116 = not found
    throw error;
  }
  
  return data;
};

export const createUser = async (fingerprint: string) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .insert({
      ip_fingerprint: fingerprint,
      trust_score: 50,
      total_contributions: 0,
      total_votes: 0
    })
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const getOrCreateUser = async (fingerprint: string) => {
  let user = await getUserByFingerprint(fingerprint);
  
  if (!user) {
    user = await createUser(fingerprint);
  }
  
  return user;
};

export const logActivity = async (
  userId: string | null,
  action: string,
  entityType: string,
  entityId: string,
  metadata: Record<string, any> = {},
  ipAddress?: string,
  userAgent?: string
) => {
  const { error } = await supabaseAdmin
    .from('activity_log')
    .insert({
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      metadata,
      ip_address: ipAddress,
      user_agent: userAgent
    });
    
  if (error) throw error;
};

export default supabaseAdmin;