import express from 'express';

const router = express.Router();

// Example route for fetching a user
router.get('/user/:id', (req, res) => {
    const userId = req.params.id;

    // Simulated user data (replace this with actual database logic)
    const userData = { id: userId, name: 'John Doe', email: 'john@example.com' };
    
    res.json(userData);
});

// Ensure this is the default export
export default router;
