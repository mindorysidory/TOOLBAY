import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { asyncHandler, ApiError } from '../middleware/errorHandler';
import { supabaseAdmin } from '../lib/supabase';
import { logger } from '../lib/logger';
import { requireUser, preventBanned } from '../middleware/ipFingerprint';

const router = Router();

// GET /api/tools - Get all tools with optional filtering
router.get('/', asyncHandler(async (req, res) => {
  const { 
    category, 
    search, 
    pricing, 
    featured, 
    sponsored,
    sort = 'rating',
    order = 'desc',
    limit = 50,
    offset = 0 
  } = req.query;

  let query = supabaseAdmin
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
  if (category) {
    query = query.eq('category_id', category);
  }

  if (pricing) {
    query = query.eq('pricing', pricing);
  }

  if (featured === 'true') {
    query = query.eq('is_featured', true);
  }

  if (sponsored === 'true') {
    query = query.eq('is_sponsored', true);
  }

  // Apply search if provided
  if (search && typeof search === 'string') {
    query = query.textSearch('search_vector', search);
  }

  // Apply sorting
  const sortField = sort === 'rating' ? 'average_rating' : 
                   sort === 'votes' ? 'total_votes' :
                   sort === 'opinions' ? 'total_opinions' :
                   sort === 'created' ? 'created_at' : 'average_rating';

  query = query.order(sortField, { ascending: order === 'asc' });

  // Apply pagination
  const limitNum = Math.min(parseInt(limit as string) || 50, 100);
  const offsetNum = parseInt(offset as string) || 0;
  
  query = query.range(offsetNum, offsetNum + limitNum - 1);

  const { data: tools, error, count } = await query;

  if (error) {
    logger.error('Failed to fetch tools:', error);
    throw new ApiError('Failed to fetch tools', 500, 'DATABASE_ERROR');
  }

  res.json({
    success: true,
    data: {
      tools: tools || [],
      pagination: {
        total: count || 0,
        limit: limitNum,
        offset: offsetNum,
        hasMore: (count || 0) > offsetNum + limitNum
      },
      filters: {
        category,
        search,
        pricing,
        featured,
        sponsored,
        sort,
        order
      }
    }
  });
}));

// GET /api/tools/:id - Get specific tool
router.get('/:id', 
  param('id').isUUID().withMessage('Invalid tool ID'),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const { data: tool, error } = await supabaseAdmin
      .from('tools')
      .select(`
        *,
        categories:category_id (
          id,
          name,
          description
        )
      `)
      .eq('id', id)
      .eq('is_active', true)
      .eq('is_approved', true)
      .single();

    if (error || !tool) {
      throw new ApiError('Tool not found', 404, 'TOOL_NOT_FOUND');
    }

    res.json({
      success: true,
      data: { tool }
    });
  })
);

// POST /api/tools - Submit new tool
router.post('/',
  requireUser,
  preventBanned,
  [
    body('name').trim().isLength({ min: 2, max: 200 }).withMessage('Name must be 2-200 characters'),
    body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be 10-2000 characters'),
    body('url').isURL().withMessage('Must be a valid URL'),
    body('category_id').isLength({ min: 1 }).withMessage('Category is required'),
    body('pricing').isIn(['free', 'freemium', 'subscription', 'one-time', 'unknown']).withMessage('Invalid pricing type'),
    body('meta_title').optional().trim().isLength({ max: 300 }).withMessage('Meta title too long'),
    body('meta_description').optional().trim().isLength({ max: 2000 }).withMessage('Meta description too long'),
    body('tags').optional().isArray().withMessage('Tags must be an array'),
  ],
  asyncHandler(async (req, res) => {
    const {
      name,
      description,
      url,
      favicon,
      category_id,
      pricing,
      meta_title,
      meta_description,
      tags = []
    } = req.body;

    // Check for duplicate URL
    const { data: existingTool } = await supabaseAdmin
      .from('tools')
      .select('id, name')
      .eq('url', url)
      .single();

    if (existingTool) {
      throw new ApiError('Tool with this URL already exists', 409, 'DUPLICATE_URL', {
        existingTool: existingTool.name
      });
    }

    // Insert new tool
    const { data: tool, error } = await supabaseAdmin
      .from('tools')
      .insert({
        name: name.trim(),
        description: description.trim(),
        url,
        favicon,
        category_id,
        pricing,
        meta_title: meta_title?.trim(),
        meta_description: meta_description?.trim(),
        tags: tags.filter(Boolean),
        submitted_by: req.user.id,
        is_approved: false, // Requires moderation
        is_active: true
      })
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
      logger.error('Failed to create tool:', error);
      throw new ApiError('Failed to create tool', 500, 'DATABASE_ERROR');
    }

    logger.info('New tool submitted:', {
      toolId: tool.id,
      name: tool.name,
      submittedBy: req.user.id,
      url
    });

    res.status(201).json({
      success: true,
      data: { tool },
      message: 'Tool submitted successfully and is pending approval'
    });
  })
);

export default router;