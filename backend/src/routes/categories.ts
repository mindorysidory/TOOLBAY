import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { supabaseAdmin } from '../lib/supabase';

const router = Router();

// GET /api/categories - Get all categories
router.get('/', asyncHandler(async (req, res) => {
  const { data: categories, error } = await supabaseAdmin
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (error) {
    throw new Error('Failed to fetch categories');
  }

  res.json({
    success: true,
    data: { categories: categories || [] }
  });
}));

export default router;