import express from 'express';
import * as authController from '../controller/AuthController';
import { protect } from '../middleware/AuthMiddleware';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', protect, authController.getMe);

export default router;