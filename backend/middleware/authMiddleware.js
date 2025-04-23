import jwt from 'jsonwebtoken';

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract the token
    if (!token) return res.status(401).json({ message: "Access Denied: No token provided" });

    console.log("Received Token:", token);
    console.log("Decoded Token:", jwt.decode(token));
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user ID to request
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};
