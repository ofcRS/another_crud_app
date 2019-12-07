import { Router } from 'express';

import postRoutes from './post';
import authRoutes from './auth';

const router = Router();

router.use('/posts', postRoutes);
router.use('/auth', authRoutes);

export default router;
