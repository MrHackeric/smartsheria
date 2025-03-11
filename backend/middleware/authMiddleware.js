import jwt from 'jsonwebtoken';

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user data to request
        next();
    } catch (error) {
        res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};
