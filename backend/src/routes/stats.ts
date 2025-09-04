import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Stats endpoint - coming soon',
    data: { stats: {} }
  });
}));

export default router;