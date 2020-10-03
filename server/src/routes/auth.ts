import express from 'express';

import { authController } from 'controllers/authController';

const router = express.Router();

router.get('/refresh_token', authController.refreshToken);
router.get('/current', authController.getCurrentUser);
router.get('/logout', authController.logout);

export default router;
