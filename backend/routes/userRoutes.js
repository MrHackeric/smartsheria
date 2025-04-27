// backend/routes/userRoutes.js

import express from 'express';
import { getAllUsers, addUser, deleteUser, searchUsers } from '../controllers/userController.js';

const router = express.Router();

// Get all users
router.get('/', getAllUsers);

// Add a new user
router.post('/', addUser);

// Delete a user
router.delete('/:id', deleteUser);

// Search users
router.get('/search', searchUsers);

export default router;
