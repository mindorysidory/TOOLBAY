import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Basic stub - will implement fully next
router.get('/', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Opinions endpoint - coming soon',
    data: { opinions: [] }
  });
}));

export default router;