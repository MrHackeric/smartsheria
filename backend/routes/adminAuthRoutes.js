import express from 'express';
import { signup, login } from '../controllers/adminAuthController.js';

const router = express.Router();

router.post('/admin-signup', signup); // Admin sign up
router.post('/admin-login', login);    // Admin login

export default router;
