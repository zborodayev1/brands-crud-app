import express from 'express';
import { AuthController } from '../controllers/index';
import { checkAuth } from '../middlewares/checkAuth';

const router = express.Router();

router.post('/sign-up', AuthController.signUp);
router.post('/sign-in', AuthController.signIn);
router.post('/sign-out', checkAuth, AuthController.signOut);
router.get('/me', checkAuth, AuthController.getMe);

export default router;
