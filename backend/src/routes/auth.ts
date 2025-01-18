import { Router } from 'express';
import {
  register,
  login,
  protectedRoute,
} from '../controllers/authController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/protected', authenticateToken, protectedRoute);

export default router;
