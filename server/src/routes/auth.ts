import express from 'express';

import { authController } from 'controllers/authController';

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signUp);
router.get('/refresh_token', authController.refreshToken);

export default router;
