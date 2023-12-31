import express from 'express';
import { registerUser,loginUser } from '../controllers/auth.js';

const router = express.Router();

router.post('/registerUser',registerUser);
router.post('/login',loginUser);

export default router;
