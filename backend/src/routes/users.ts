import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Users endpoint - coming soon',
    data: { users: [] }
  });
}));

export default router;