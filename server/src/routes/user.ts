import express from 'express';

import { authController } from 'controllers/authController';

export const router = express.Router();

router.post('/login', authController.login);
