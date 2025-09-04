import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Votes endpoint - coming soon',
    data: { votes: [] }
  });
}));

export default router;