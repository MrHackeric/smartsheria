import express from 'express';
import { createMessage, getMessages } from '../controllers/communityMessageController.js';

const router = express.Router();

router.post('/', createMessage); // Save a new message
router.get('/', getMessages); // Fetch all messages

export default router;
