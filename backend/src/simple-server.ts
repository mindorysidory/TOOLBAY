import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Basic middleware
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173',
    'https://toolbay.vercel.app',
    'https://toolbay-git-main-mindorysidory.vercel.app',
    'https://toolbay-mindorysidory.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Supabase client - 환경변수 체크 추가
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey,
    env: process.env.NODE_ENV
  });
}

const supabase = createClient(
  supabaseUrl || '',
  supabaseKey || ''
);

// Test routes
app.get('/', (req, res) => {
  res.json({
    name: 'TOOLBAY API',
    status: 'healthy', 
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    env: {
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasSupabaseKey: !!(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY)
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'TOOLBAY API Server is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API 기본 경로를 루트로 변경
app.get('/api', (req, res) => {
  res.json({
    name: 'TOOLBAY API',
    version: '1.0.0',
    status: 'ready',
    endpoints: {
      health: '/api/health',
      tools: '/api/tools',
      categories: '/api/categories'
    }
  });
});

// Environment debug endpoint
app.get('/api/env-check', (req, res) => {
  res.json({
    supabase: {
      hasUrl: !!process.env.SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_KEY,
      hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      urlLength: process.env.SUPABASE_URL?.length || 0,
      keyLength: (process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)?.length || 0,
      nodeEnv: process.env.NODE_ENV
    },
    timestamp: new Date().toISOString()
  });
});

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    console.log('Testing database connection...');
    console.log('Supabase URL:', process.env.SUPABASE_URL?.substring(0, 20) + '...');
    console.log('Key available:', !!(process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY));
    
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .limit(5);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Database query successful, data:', data);

    res.json({
      success: true,
      message: 'Database connection successful!',
      data: {
        categories: data,
        count: data?.length || 0
      }
    });
  } catch (error) {
    console.error('Database connection error:', error);
    const errorDetails = error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack?.substring(0, 500)
    } : error;
    
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      details: errorDetails
    });
  }
});

// Get categories
app.get('/api/categories', async (req, res) => {
  try {
    console.log('Fetching categories...');
    
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');

    if (error) {
      console.error('Categories query error:', error);
      throw error;
    }

    console.log('Categories fetched successfully:', categories?.length || 0);

    res.json({
      success: true,
      data: { categories: categories || [] }
    });
  } catch (error) {
    console.error('Categories endpoint error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? {
        name: error.name,
        message: error.message
      } : error
    });
  }
});

// Get tools with filtering and pagination
app.get('/api/tools', async (req, res) => {
  try {
    const { category, search, limit = 20, offset = 0 } = req.query;
    
    let query = supabase
      .from('tools')
      .select(`
        *,
        categories:category_id (
          id,
          name,
          description
        )
      `)
      .eq('is_active', true)
      .eq('is_approved', true);

    // Apply filters
    if (category && category !== 'all') {
      query = query.eq('category_id', category);
    }

    if (search) {
      query = query.textSearch('search_vector', String(search));
    }

    // Apply pagination and ordering
    const { data: tools, error } = await query
      .order('average_rating', { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1);

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      data: { 
        tools: tools || [],
        count: tools?.length || 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get single tool by ID
app.get('/api/tools/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data: tool, error } = await supabase
      .from('tools')
      .select(`
        *,
        categories:category_id (
          id,
          name,
          description
        ),
        opinions (
          id,
          content,
          rating,
          vote_score,
          created_at,
          users (
            trust_score
          )
        )
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Tool not found'
        });
      }
      throw error;
    }

    res.json({
      success: true,
      data: { tool }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Create new tool
app.post('/api/tools', async (req, res) => {
  try {
    const { name, description, url, category_id, pricing = 'unknown', tags = [] } = req.body as {
      name: string;
      description: string;
      url: string;
      category_id: string;
      pricing?: string;
      tags?: string[];
    };

    if (!name || !description || !url || !category_id) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, description, url, category_id'
      });
    }

    // Generate favicon URL
    const favicon = url.includes('favicon') ? url : `https://www.google.com/s2/favicons?sz=64&domain=${new URL(url).hostname}`;
    
    // Create anonymous user if needed (IP-based identification)
    const ipFingerprint = req.ip || 'unknown';
    
    let { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('ip_fingerprint', ipFingerprint)
      .single();

    if (!user) {
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert([{ ip_fingerprint: ipFingerprint }])
        .select()
        .single();
      
      if (userError) throw userError;
      user = newUser;
    }

    const { data: tool, error } = await supabase
      .from('tools')
      .insert([{
        name,
        description,
        url,
        favicon,
        category_id,
        pricing,
        tags,
        submitted_by: user?.id || '',
        meta_title: name,
        meta_description: description.substring(0, 160)
      }])
      .select(`
        *,
        categories:category_id (
          id,
          name,
          description
        )
      `)
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      success: true,
      message: 'Tool created successfully',
      data: { tool }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update tool
app.put('/api/tools/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, url, category_id, pricing, tags } = req.body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (url) {
      updateData.url = url;
      updateData.favicon = url.includes('favicon') ? url : `https://www.google.com/s2/favicons?sz=64&domain=${new URL(url).hostname}`;
    }
    if (category_id) updateData.category_id = category_id;
    if (pricing) updateData.pricing = pricing;
    if (tags) updateData.tags = tags;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No update fields provided'
      });
    }

    const { data: tool, error } = await supabase
      .from('tools')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        categories:category_id (
          id,
          name,
          description
        )
      `)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Tool not found'
        });
      }
      throw error;
    }

    res.json({
      success: true,
      message: 'Tool updated successfully',
      data: { tool }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Delete tool
app.delete('/api/tools/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Soft delete by setting is_active to false
    const { data: tool, error } = await supabase
      .from('tools')
      .update({ is_active: false })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Tool not found'
        });
      }
      throw error;
    }

    res.json({
      success: true,
      message: 'Tool deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// =============================================
// OPINIONS/REVIEWS API ENDPOINTS
// =============================================

// Get opinions for a specific tool
app.get('/api/tools/:toolId/opinions', async (req, res) => {
  try {
    const { toolId } = req.params;
    const { limit = 20, offset = 0 } = req.query;

    const { data: opinions, error } = await supabase
      .from('opinions')
      .select(`
        *,
        users (
          trust_score
        )
      `)
      .eq('tool_id', toolId)
      .eq('is_approved', true)
      .order('vote_score', { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1);

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      data: { opinions: opinions || [], count: opinions?.length || 0 }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Create new opinion
app.post('/api/tools/:toolId/opinions', async (req, res) => {
  try {
    const { toolId } = req.params;
    const { content, rating } = req.body;

    if (!content || content.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Opinion content must be at least 10 characters'
      });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        success: false,
        error: 'Rating must be between 1 and 5'
      });
    }

    // Get or create user based on IP
    const ipFingerprint = req.ip || 'unknown';
    
    let { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('ip_fingerprint', ipFingerprint)
      .single();

    if (!user) {
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert([{ ip_fingerprint: ipFingerprint }])
        .select()
        .single();
      
      if (userError) throw userError;
      user = newUser;
    }

    // Check if user already has an opinion for this tool
    const { data: existingOpinion } = await supabase
      .from('opinions')
      .select('id')
      .eq('tool_id', toolId)
      .eq('user_id', user?.id || '')
      .single();

    if (existingOpinion) {
      return res.status(409).json({
        success: false,
        error: 'You have already submitted an opinion for this tool'
      });
    }

    const { data: opinion, error } = await supabase
      .from('opinions')
      .insert([{
        tool_id: toolId,
        user_id: user?.id || '',
        content,
        rating
      }])
      .select(`
        *,
        users (
          trust_score
        )
      `)
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      success: true,
      message: 'Opinion created successfully',
      data: { opinion }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// =============================================
// VOTING SYSTEM API ENDPOINTS
// =============================================

// Vote on an opinion
app.post('/api/opinions/:opinionId/votes', async (req, res) => {
  try {
    const { opinionId } = req.params;
    const { vote_type } = req.body;

    if (!vote_type || !['up', 'down'].includes(vote_type)) {
      return res.status(400).json({
        success: false,
        error: 'Vote type must be "up" or "down"'
      });
    }

    // Get or create user based on IP
    const ipFingerprint = req.ip || 'unknown';
    
    let { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('ip_fingerprint', ipFingerprint)
      .single();

    if (!user) {
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert([{ ip_fingerprint: ipFingerprint }])
        .select()
        .single();
      
      if (userError) throw userError;
      user = newUser;
    }

    // Check if user already voted on this opinion
    const { data: existingVote } = await supabase
      .from('votes')
      .select('id, vote_type')
      .eq('opinion_id', opinionId)
      .eq('user_id', user?.id || '')
      .single();

    if (existingVote) {
      if (existingVote.vote_type === vote_type) {
        // Remove vote if same type
        const { error: deleteError } = await supabase
          .from('votes')
          .delete()
          .eq('id', existingVote.id);

        if (deleteError) throw deleteError;

        return res.json({
          success: true,
          message: 'Vote removed',
          data: { action: 'removed' }
        });
      } else {
        // Update vote if different type
        const { data: vote, error } = await supabase
          .from('votes')
          .update({ vote_type })
          .eq('id', existingVote.id)
          .select()
          .single();

        if (error) throw error;

        return res.json({
          success: true,
          message: 'Vote updated',
          data: { vote, action: 'updated' }
        });
      }
    } else {
      // Create new vote
      const { data: vote, error } = await supabase
        .from('votes')
        .insert([{
          opinion_id: opinionId,
          user_id: user?.id || '',
          vote_type
        }])
        .select()
        .single();

      if (error) throw error;

      res.status(201).json({
        success: true,
        message: 'Vote created',
        data: { vote, action: 'created' }
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get user's existing opinion for a tool
app.get('/api/tools/:toolId/my-opinion', async (req, res) => {
  try {
    const { toolId } = req.params;
    
    // Get user based on IP
    const ipFingerprint = req.ip || 'unknown';
    
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('ip_fingerprint', ipFingerprint)
      .single();

    if (!user) {
      return res.json({
        success: true,
        data: { opinion: null }
      });
    }

    const { data: opinion, error } = await supabase
      .from('opinions')
      .select(`
        *,
        users (
          trust_score
        )
      `)
      .eq('tool_id', toolId)
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw error;
    }

    res.json({
      success: true,
      data: { opinion: opinion || null }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update user's opinion
app.put('/api/opinions/:opinionId', async (req, res) => {
  try {
    const { opinionId } = req.params;
    const { content, rating } = req.body;

    if (!content || content.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Opinion content must be at least 10 characters'
      });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        success: false,
        error: 'Rating must be between 1 and 5'
      });
    }

    // Get user based on IP
    const ipFingerprint = req.ip || 'unknown';
    
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('ip_fingerprint', ipFingerprint)
      .single();

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User not found'
      });
    }

    // Verify the opinion belongs to this user
    const { data: existingOpinion } = await supabase
      .from('opinions')
      .select('user_id')
      .eq('id', opinionId)
      .single();

    if (!existingOpinion || existingOpinion.user_id !== user.id) {
      return res.status(403).json({
        success: false,
        error: 'You can only edit your own opinions'
      });
    }

    // Update the opinion
    const { data: opinion, error } = await supabase
      .from('opinions')
      .update({
        content,
        rating,
        updated_at: new Date().toISOString()
      })
      .eq('id', opinionId)
      .select(`
        *,
        users (
          trust_score
        )
      `)
      .single();

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      message: 'Opinion updated successfully',
      data: { opinion }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// =============================================
// RATING SYSTEM API ENDPOINTS
// =============================================

// Rate a tool directly
app.post('/api/tools/:toolId/ratings', async (req, res) => {
  try {
    const { toolId } = req.params;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: 'Rating must be between 1 and 5'
      });
    }

    // Get or create user based on IP
    const ipFingerprint = req.ip || 'unknown';
    
    let { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('ip_fingerprint', ipFingerprint)
      .single();

    if (!user) {
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert([{ ip_fingerprint: ipFingerprint }])
        .select()
        .single();
      
      if (userError) throw userError;
      user = newUser;
    }

    // Check if user already rated this tool
    const { data: existingRating } = await supabase
      .from('tool_ratings')
      .select('id')
      .eq('tool_id', toolId)
      .eq('user_id', user?.id || '')
      .single();

    if (existingRating) {
      // Update existing rating
      const { data: updatedRating, error } = await supabase
        .from('tool_ratings')
        .update({ rating })
        .eq('id', existingRating.id)
        .select()
        .single();

      if (error) throw error;

      return res.json({
        success: true,
        message: 'Rating updated successfully',
        data: { rating: updatedRating }
      });
    } else {
      // Create new rating
      const { data: newRating, error } = await supabase
        .from('tool_ratings')
        .insert([{
          tool_id: toolId,
          user_id: user?.id || '',
          rating
        }])
        .select()
        .single();

      if (error) throw error;

      res.status(201).json({
        success: true,
        message: 'Rating created successfully',
        data: { rating: newRating }
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `${req.originalUrl} does not exist`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 TOOLBAY API Server running on port ${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/health`);
  console.log(`🧪 DB Test: http://localhost:${PORT}/api/test-db`);
  console.log(`📚 API: http://localhost:${PORT}/api`);
  console.log(`🔧 Tools: http://localhost:${PORT}/api/tools`);
  console.log(`🏷️ Categories: http://localhost:${PORT}/api/categories`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;