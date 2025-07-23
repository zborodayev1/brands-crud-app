import express from 'express';
import { AuthController } from '../controllers/index.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = express.Router();

router.post('/sign-up', AuthController.signUp);
router.post('/sign-in', AuthController.signIn);
router.get('/sign-out', checkAuth, AuthController.signOut);

export default router;
