import express from 'express';
import { AuthController } from '../controllers/index.js';

const router = express.Router();

router.post('/sign-up', AuthController.signUp);
router.post('/sign-in', AuthController.signIn);

export default router;
